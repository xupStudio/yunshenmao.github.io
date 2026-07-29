import { matchedRedLine } from "./red-lines";
import type {
  JournalDocument,
  JournalPhoto,
  JournalPost,
  SiteEnv,
  SyncResult,
} from "./types";

export const JOURNAL_OBJECT_KEY = "journal/data.json";
export const PROCESSOR_VERSION = "2026-07-29.1";

const POSTS_LIMIT = 30;
const MAX_IMAGE_BYTES = 15 * 1024 * 1024;

type FacebookImage = {
  src?: string;
  width?: number;
  height?: number;
};

type FacebookAttachment = {
  media?: { image?: FacebookImage };
  subattachments?: { data?: FacebookAttachment[] };
};

type FacebookPost = {
  id?: string;
  message?: string;
  created_time?: string;
  permalink_url?: string;
  attachments?: { data?: FacebookAttachment[] };
};

type GeminiPart = {
  text?: string;
  thought?: boolean;
};

type GeminiResponse = {
  candidates?: Array<{
    finishReason?: string;
    content?: { parts?: GeminiPart[] };
  }>;
};

const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

async function messageHash(message: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(message),
  );
  return Array.from(new Uint8Array(digest).slice(0, 8))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function loadJournal(
  storage: R2Bucket,
  fallback: JournalDocument,
): Promise<JournalDocument> {
  const object = await storage.get(JOURNAL_OBJECT_KEY);
  if (!object) return fallback;

  try {
    return await object.json<JournalDocument>();
  } catch (error) {
    console.error("journal_storage_parse_failed", {
      message: error instanceof Error ? error.message : String(error),
    });
    return fallback;
  }
}

async function fetchFacebookPosts(env: SiteEnv): Promise<FacebookPost[]> {
  if (!env.FB_PAGE_ACCESS_TOKEN) {
    throw new Error("FB_PAGE_ACCESS_TOKEN is not configured");
  }

  const apiVersion = env.FACEBOOK_API_VERSION || "v21.0";
  const url = new URL(`https://graph.facebook.com/${apiVersion}/me/posts`);
  url.searchParams.set(
    "fields",
    "id,message,created_time,permalink_url,attachments{media,subattachments,type,media_type}",
  );
  url.searchParams.set("limit", String(POSTS_LIMIT));

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.FB_PAGE_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500);
    throw new Error(`Facebook Graph API ${response.status}: ${detail}`);
  }

  const body = (await response.json()) as { data?: unknown };
  return Array.isArray(body.data) ? (body.data as FacebookPost[]) : [];
}

function extractPhotos(post: FacebookPost): FacebookImage[] {
  const attachment = post.attachments?.data?.[0];
  if (!attachment) return [];

  if (attachment.subattachments?.data?.length) {
    return attachment.subattachments.data
      .map((item) => item.media?.image)
      .filter((image): image is FacebookImage => Boolean(image?.src));
  }

  return attachment.media?.image?.src ? [attachment.media.image] : [];
}

function buildRewritePrompt(fullMessage: string, line: string): string {
  return `你在幫一位在南投山上獨自照顧八十多隻流浪貓的師父做「最小幅度改寫」。
師父寫文很口語，常用「啊」「呢」「囉」等語助詞、夾雜貓咪暱稱與日常碎念，溫暖樸實但語氣平穩。
我會給你貼文全文與其中一行。那一行含勸募、金錢、請求協助的字眼，必須處理。

核心原則：盡量保留原句的結構、語氣、語助詞、標點、emoji 與其他細節，只把違規的幾個字或短句最小幅度地置換掉。不要重新組句、擴寫或刪去無關細節。

強制規則：
- 改寫後不得出現：捐款、捐助、捐贈、募款、勸募、樂捐、善款、匯款、戶頭、轉帳、抵稅、收據、懇請、拜託、乞求、乞丐、幫幫、善心、菩薩、善友、沒有收入、變貧戶、吃泡麵、贊助、贊助商、支持我們、需要您、感恩您
- 不得出現任何金額（數字加萬、千、元或塊）
- 不得保留請求他人協助的語氣或暗示
- 不得使用語助詞「啦」，可改用「呢」「了」或省略
- 長度應與原行接近（正負 10 字內）
- 保留原句的口語、emoji、貓咪名字和標點習慣
- 若除了勸募外沒有可保留的事實素材，回傳空字串
- 只輸出改寫後的一行，不要解釋、引號、標題或前綴

貼文全文：
"""
${fullMessage}
"""

需要改寫的那行：
"""
${line}
"""`;
}

async function rewriteWithGemini(
  env: SiteEnv,
  fullMessage: string,
  line: string,
): Promise<string | null> {
  if (!env.GEMINI_API_KEY) return null;

  const model = env.GEMINI_MODEL || "gemini-2.5-flash";
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/` +
    `${encodeURIComponent(model)}:generateContent`;
  const thinkingConfig = model.startsWith("gemini-3")
    ? { thinkingLevel: "LOW" }
    : { thinkingBudget: 0 };
  const body = JSON.stringify({
    contents: [{ parts: [{ text: buildRewritePrompt(fullMessage, line) }] }],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 1024,
      thinkingConfig,
    },
  });

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": env.GEMINI_API_KEY,
        },
        body,
      });

      if (response.status === 429 || response.status === 503) {
        if (attempt < 2) {
          await delay(800 * (attempt + 1));
          continue;
        }
        return null;
      }

      if (!response.ok) {
        console.warn("gemini_rewrite_http_error", {
          status: response.status,
        });
        return null;
      }

      const result = (await response.json()) as GeminiResponse;
      const candidate = result.candidates?.[0];
      if (
        candidate?.finishReason &&
        candidate.finishReason !== "STOP"
      ) {
        return null;
      }

      const raw = (candidate?.content?.parts ?? [])
        .filter(
          (part) => !part.thought && typeof part.text === "string",
        )
        .map((part) => part.text)
        .join("")
        .trim();
      const text = raw
        .replace(/^"""\s*/, "")
        .replace(/\s*"""$/, "")
        .replace(/^'''\s*/, "")
        .replace(/\s*'''$/, "")
        .trim();

      if (!text || matchedRedLine(text)) return null;
      return text;
    } catch (error) {
      console.warn("gemini_rewrite_failed", {
        attempt: attempt + 1,
        message: error instanceof Error ? error.message : String(error),
      });
      if (attempt < 2) await delay(800 * (attempt + 1));
    }
  }

  return null;
}

async function sanitizeMessage(
  env: SiteEnv,
  message: string,
): Promise<{
  sanitized: string;
  droppedLines: number;
  rewrittenLines: number;
}> {
  if (!message) {
    return { sanitized: "", droppedLines: 0, rewrittenLines: 0 };
  }

  const kept: string[] = [];
  let droppedLines = 0;
  let rewrittenLines = 0;

  for (const line of message.split(/\n/)) {
    if (line.trim() && matchedRedLine(line)) {
      const rewritten = await rewriteWithGemini(env, message, line);
      if (rewritten) {
        kept.push(rewritten);
        rewrittenLines += 1;
      } else {
        droppedLines += 1;
      }
      continue;
    }
    kept.push(line);
  }

  return {
    sanitized: kept.join("\n").replace(/\n{3,}/g, "\n\n").trim(),
    droppedLines,
    rewrittenLines,
  };
}

async function storePhotoIfMissing(
  storage: R2Bucket,
  postId: string,
  index: number,
  photo: FacebookImage,
): Promise<{ photo: JournalPhoto; uploaded: boolean } | null> {
  if (!photo.src) return null;

  const key = `photos/journal/${postId}/${index}.jpg`;
  const webPath = `/${key}`;
  const existing = await storage.head(key);

  if (existing) {
    return {
      photo: {
        src: webPath,
        width: photo.width,
        height: photo.height,
      },
      uploaded: false,
    };
  }

  const response = await fetch(photo.src);
  if (!response.ok) {
    console.warn("journal_photo_download_failed", {
      postId,
      index,
      status: response.status,
    });
    return null;
  }

  const declaredLength = Number(response.headers.get("content-length") || "0");
  if (declaredLength > MAX_IMAGE_BYTES) {
    console.warn("journal_photo_too_large", { postId, index, declaredLength });
    return null;
  }

  const contentType =
    response.headers.get("content-type")?.split(";")[0] || "image/jpeg";
  if (!contentType.startsWith("image/")) {
    console.warn("journal_photo_invalid_content_type", {
      postId,
      index,
      contentType,
    });
    return null;
  }

  if (!response.body) {
    console.warn("journal_photo_empty_body", { postId, index });
    return null;
  }

  await storage.put(key, response.body, {
    httpMetadata: {
      contentType,
      cacheControl: "public, max-age=31536000, immutable",
    },
  });

  return {
    photo: {
      src: webPath,
      width: photo.width,
      height: photo.height,
    },
    uploaded: true,
  };
}

export async function syncJournal(
  env: SiteEnv,
  fallback: JournalDocument,
): Promise<SyncResult> {
  const existing = await loadJournal(env.JOURNAL_STORAGE, fallback);
  const existingById = new Map(
    existing.posts.filter((post) => post.id).map((post) => [post.id, post]),
  );
  const rawPosts = await fetchFacebookPosts(env);
  const posts: JournalPost[] = [];

  let cacheHits = 0;
  let rewrittenLines = 0;
  let droppedLines = 0;
  let filteredPosts = 0;
  let uploadedPhotos = 0;

  for (const rawPost of rawPosts) {
    if (!rawPost.id || !rawPost.created_time || !rawPost.permalink_url) {
      console.warn("facebook_post_missing_required_fields");
      continue;
    }

    const rawMessage = rawPost.message || "";
    const rawHash = await messageHash(rawMessage);
    const cached = existingById.get(rawPost.id);

    if (
      cached &&
      cached.rawHash === rawHash &&
      cached.processorVersion === PROCESSOR_VERSION
    ) {
      posts.push(cached);
      cacheHits += 1;
      continue;
    }

    const sanitized = await sanitizeMessage(env, rawMessage);
    rewrittenLines += sanitized.rewrittenLines;
    droppedLines += sanitized.droppedLines;

    const remotePhotos = extractPhotos(rawPost);
    if (!sanitized.sanitized && remotePhotos.length === 0) {
      filteredPosts += 1;
      continue;
    }

    const photos: JournalPhoto[] = [];
    for (let index = 0; index < remotePhotos.length; index += 1) {
      const stored = await storePhotoIfMissing(
        env.JOURNAL_STORAGE,
        rawPost.id,
        index,
        remotePhotos[index],
      );
      if (!stored) continue;
      photos.push(stored.photo);
      if (stored.uploaded) uploadedPhotos += 1;
    }

    posts.push({
      id: rawPost.id,
      createdAt: rawPost.created_time,
      message: sanitized.sanitized,
      permalink: rawPost.permalink_url,
      photos,
      edited: sanitized.droppedLines > 0,
      rewritten: sanitized.rewrittenLines > 0,
      rawHash,
      processorVersion: PROCESSOR_VERSION,
    });
  }

  const syncedAt = new Date().toISOString();
  const document: JournalDocument = { syncedAt, posts };

  // This is intentionally the final write. Readers never see JSON that points
  // to photos which have not finished uploading yet.
  await env.JOURNAL_STORAGE.put(
    JOURNAL_OBJECT_KEY,
    JSON.stringify(document),
    {
      httpMetadata: {
        contentType: "application/json; charset=utf-8",
        cacheControl: "public, max-age=60",
      },
      customMetadata: {
        syncedAt,
        processorVersion: PROCESSOR_VERSION,
      },
    },
  );

  return {
    fetched: rawPosts.length,
    published: posts.length,
    cacheHits,
    rewrittenLines,
    droppedLines,
    filteredPosts,
    uploadedPhotos,
    syncedAt,
  };
}
