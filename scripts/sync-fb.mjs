#!/usr/bin/env node
import { writeFile, readFile, mkdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { createHash } from "node:crypto";

const POSTS_LIMIT = 30;
const API_VERSION = "v21.0";
const TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.5-flash";
const ROOT = process.cwd();
const JOURNAL_JSON = join(ROOT, "data", "journal.json");
const PHOTO_DIR_REL = "public/photos/journal";

// Red-line patterns: posts whose message matches any of these are skipped
// entirely (not committed to the site). Tuned to catch fundraising language
// that would violate Taiwan 公益勸募條例 for an unregistered individual.
const RED_LINE_PATTERNS = [
  // 直接金錢勸募
  /捐款/, /捐助/, /捐贈/, /募款/, /勸募/, /樂捐/, /善款/,
  // 金流
  /匯款/, /戶頭/, /轉帳/, /抵稅/, /收據/,
  // 勸募語氣
  /懇請/, /拜託拜託/, /乞求/, /乞丐/,
  /幫幫/, /請大家幫/, /善心菩薩/, /善友/,
  // 貧困敘事
  /沒有收入/, /没有收入/, /變貧戶/, /吃泡麵/,
  // 金額（帶單位）
  /[\d一二三四五六七八九十百千兩]+\s*(萬|塊|千|元)/,
  // 裸數字金額：3 位以上連續數字，前面不是英文字母（避免誤抓飼料型號如
  // Gim35/K36/LP34），後面不接量詞（避免誤抓貓狗計數如 120個/80隻）。
  /(?<![A-Za-z])\d{3,}(?![個隻天週年月位貓狗匹頭次])/,
];

function matchedRedLine(message) {
  if (!message) return null;
  for (const re of RED_LINE_PATTERNS) {
    const m = message.match(re);
    if (m) return { keyword: m[0], pattern: re.source };
  }
  return null;
}

function messageHash(message) {
  return createHash("sha256")
    .update(message || "")
    .digest("hex")
    .slice(0, 16);
}

async function loadExistingPosts() {
  try {
    const raw = await readFile(JOURNAL_JSON, "utf-8");
    const json = JSON.parse(raw);
    const map = new Map();
    for (const p of json.posts ?? []) {
      if (p.id) map.set(p.id, p);
    }
    return map;
  } catch {
    return new Map();
  }
}

// Ask Gemini to rewrite one red-line line into neutral narrative. The rewritten
// output is re-checked against RED_LINE_PATTERNS; if it still matches or the
// call fails, return null so the caller falls back to dropping the line.
async function rewriteWithGemini(fullMessage, line) {
  if (!GEMINI_API_KEY) return null;
  const prompt = `你在幫一位在南投山上獨自照顧八十多隻流浪貓的師父做「最小幅度改寫」。\n師父寫文很口語，常用「啊」「呢」「囉」等語助詞、夾雜貓咪暱稱與日常碎念，溫暖樸實但語氣平穩。\n我會給你貼文全文與其中一行。那一行含勸募、金錢、請求協助的字眼，違反台灣公益勸募條例對未立案個人的限制，必須處理。\n\n核心原則：**盡量保留原句的結構、語氣、語助詞、標點、emoji 與其他細節**，只把違規的「那幾個字或那個短句」最小幅度地置換掉。不要重新組句、不要擴寫、不要刪去無關細節。讀起來要像師父原本就那樣寫的，差別越小越好。\n\n強制規則：\n- 改寫後絕對不得出現下列字眼或同義替換：捐款、捐助、捐贈、募款、勸募、樂捐、善款、匯款、戶頭、轉帳、抵稅、收據、懇請、拜託、乞求、乞丐、幫幫、善心、菩薩、善友、沒有收入、變貧戶、吃泡麵、贊助、贊助商、支持我們、需要您、感恩您\n- 不得出現任何金額（數字＋萬/千/元/塊）\n- 不得保留「請求他人協助」的語氣或暗示\n- **不得使用語助詞「啦」**（例如「不夠了啦」「快沒了啦」），這個字會讓語氣聽起來焦慮、情緒不穩，不符合師父平和的形象。可改用「呢」「了」或不加語助詞\n- 長度應該與原行差不多（±10 字內），不要明顯變短或變長\n- 風格保留原句的口語、語助詞（除「啦」之外）、emoji、貓咪名字、標點習慣\n- 若該行除了勸募外完全沒有可保留的事實素材，回傳一個空字串\n- 僅輸出改寫後那一行，不要任何解釋、引號、標題或前綴\n\n範例（示範「最小幅度」是什麼意思）：\n  原行：今天小花又拉肚子了，懇請大家幫忙捐款買藥 🙏\n  改寫：今天小花又拉肚子了，希望牠快點好起來 🙏\n  （保留「今天小花又拉肚子了」「🙏」，只置換違規的後半段）\n\n貼文全文（給你上下文用）：\n"""\n${fullMessage}\n"""\n\n需要改寫的那行：\n"""\n${line}\n"""`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 1024,
      // gemini-2.5-flash defaults to thinking enabled, which eats the output
      // budget and produces mid-sentence truncation. We need a single short
      // line back, not chain-of-thought — disable thinking entirely.
      thinkingConfig: { thinkingBudget: 0 },
    },
  });
  // 503s from generativelanguage are common transient errors; retry a couple
  // of times with backoff before giving up and falling back to drop.
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (res.status === 503 || res.status === 429) {
        if (attempt < 2) {
          await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
          continue;
        }
        console.warn(`  gemini rewrite http ${res.status} (gave up after retries)`);
        return null;
      }
      if (!res.ok) {
        console.warn(`  gemini rewrite http ${res.status}`);
        return null;
      }
      const json = await res.json();
      const cand = json.candidates?.[0];
      const finishReason = cand?.finishReason;
      // Gemini 2.5 can split output across multiple parts and may emit a
      // `thought: true` part even when thinkingBudget is 0. Reading only
      // parts[0] previously caused mid-sentence truncation when the real
      // answer lived in parts[1] or later. Join all non-thought text parts.
      const parts = cand?.content?.parts ?? [];
      const raw = parts
        .filter((p) => !p.thought && typeof p.text === "string")
        .map((p) => p.text)
        .join("")
        .trim();
      // Gemini occasionally echoes the prompt's """ delimiter back into the
      // output despite the "no quotes / prefix" rule. Strip wrapping triple-
      // quotes before returning. Only strip when wrapping the WHOLE output,
      // not partial — naive bracket-stripping breaks legit quotes like 「小花」
      // appearing mid-sentence.
      let text = raw;
      text = text.replace(/^"""\s*/, "").replace(/\s*"""$/, "");
      text = text.replace(/^'''\s*/, "").replace(/\s*'''$/, "");
      text = text.trim();
      if (finishReason && finishReason !== "STOP") {
        console.warn(`  gemini rewrite finish=${finishReason}, dropping`);
        return null;
      }
      if (!text) return null;
      if (matchedRedLine(text)) {
        console.warn(`  gemini rewrite still hit red-line, dropping`);
        return null;
      }
      return text;
    } catch (e) {
      console.warn(`  gemini rewrite error: ${e.message}`);
      return null;
    }
  }
  return null;
}

// Line-level sanitization: any line matching a red-line pattern is first sent
// to Gemini for a neutral rewrite. If the rewrite is empty, still red-line,
// or the API is unavailable, the line is dropped. Consecutive blank lines
// collapse to one. `edited` flag is only raised when content was actually
// dropped — pure rewrites stay invisible to the reader by design.
async function sanitizeMessage(message) {
  if (!message) return { sanitized: "", droppedLines: 0, rewrittenLines: 0 };
  const lines = message.split(/\n/);
  let droppedLines = 0;
  let rewrittenLines = 0;
  const kept = [];
  for (const line of lines) {
    if (line.trim() && matchedRedLine(line)) {
      const rewritten = await rewriteWithGemini(message, line);
      if (rewritten) {
        kept.push(rewritten);
        rewrittenLines++;
      } else {
        droppedLines++;
      }
      continue;
    }
    kept.push(line);
  }
  const sanitized = kept.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  return { sanitized, droppedLines, rewrittenLines };
}

if (!TOKEN) {
  console.error("FB_PAGE_ACCESS_TOKEN env var is required");
  process.exit(1);
}

async function fetchPosts() {
  const url = new URL(`https://graph.facebook.com/${API_VERSION}/me/posts`);
  url.searchParams.set(
    "fields",
    "id,message,created_time,permalink_url,attachments{media,subattachments,type,media_type}"
  );
  url.searchParams.set("limit", String(POSTS_LIMIT));
  url.searchParams.set("access_token", TOKEN);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Graph API ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  return json.data ?? [];
}

function extractPhotos(post) {
  const photos = [];
  const top = post.attachments?.data?.[0];
  if (!top) return photos;

  if (top.subattachments?.data?.length) {
    for (const sub of top.subattachments.data) {
      const img = sub.media?.image;
      if (img?.src) photos.push({ src: img.src, width: img.width, height: img.height });
    }
  } else if (top.media?.image?.src) {
    const img = top.media.image;
    photos.push({ src: img.src, width: img.width, height: img.height });
  }
  return photos;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function downloadIfMissing(remoteUrl, localPath) {
  if (await exists(localPath)) return false;
  await mkdir(dirname(localPath), { recursive: true });
  const res = await fetch(remoteUrl);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  await writeFile(localPath, Buffer.from(await res.arrayBuffer()));
  return true;
}

async function main() {
  console.log(`Fetching last ${POSTS_LIMIT} posts...`);
  const raw = await fetchPosts();
  console.log(`Got ${raw.length} posts from API`);

  const existingPosts = await loadExistingPosts();

  const posts = [];
  let downloaded = 0;
  let redLineFiltered = 0;
  let emptyFiltered = 0;
  let totalRewritten = 0;
  let cacheHits = 0;

  for (const p of raw) {
    const rawHash = messageHash(p.message);
    const cached = existingPosts.get(p.id);
    if (cached && cached.rawHash === rawHash) {
      posts.push(cached);
      cacheHits++;
      console.log(`  cached ${p.id}`);
      continue;
    }

    const { sanitized, droppedLines, rewrittenLines } = await sanitizeMessage(p.message);
    const photos = extractPhotos(p);
    if (!sanitized && photos.length === 0) {
      if (droppedLines > 0) {
        redLineFiltered++;
        console.log(`  filtered ${p.id} (red-line)`);
      } else {
        emptyFiltered++;
        console.log(`  filtered ${p.id} (empty)`);
      }
      continue;
    }
    if (droppedLines > 0 || rewrittenLines > 0) {
      console.log(
        `  edited ${p.id} (${rewrittenLines} rewritten, ${droppedLines} dropped)`
      );
      totalRewritten += rewrittenLines;
    }
    const localPhotos = [];

    for (let i = 0; i < photos.length; i++) {
      const ext = ".jpg";
      const relPath = `${PHOTO_DIR_REL}/${p.id}/${i}${ext}`;
      const localPath = join(ROOT, relPath);
      const webPath = `/${relPath.replace(/^public\//, "")}`;
      try {
        const wasNew = await downloadIfMissing(photos[i].src, localPath);
        if (wasNew) downloaded++;
        localPhotos.push({
          src: webPath,
          width: photos[i].width,
          height: photos[i].height,
        });
      } catch (e) {
        console.warn(`  skipped ${webPath}: ${e.message}`);
      }
    }

    posts.push({
      id: p.id,
      createdAt: p.created_time,
      message: sanitized,
      permalink: p.permalink_url,
      photos: localPhotos,
      edited: droppedLines > 0,
      rewritten: rewrittenLines > 0,
      rawHash,
    });
  }

  const out = { syncedAt: new Date().toISOString(), posts };
  await writeFile(JOURNAL_JSON, JSON.stringify(out, null, 2) + "\n");
  console.log(
    `Wrote ${posts.length} posts (cached ${cacheHits}, filtered ${redLineFiltered} red-line, ${emptyFiltered} empty; rewrote ${totalRewritten} new line(s)); downloaded ${downloaded} new photos`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
