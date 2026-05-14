#!/usr/bin/env node
import { writeFile, mkdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";

const POSTS_LIMIT = 30;
const API_VERSION = "v21.0";
const TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
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
  // 金額
  /[\d一二三四五六七八九十百千兩]+\s*(萬|塊|千|元)/,
];

function matchedRedLine(message) {
  if (!message) return null;
  for (const re of RED_LINE_PATTERNS) {
    const m = message.match(re);
    if (m) return { keyword: m[0], pattern: re.source };
  }
  return null;
}

function sanitizeMessage(message) {
  if (!message) return { sanitized: "", droppedLines: 0 };
  const lines = message.split(/\n/);
  let droppedLines = 0;
  const kept = [];
  for (const line of lines) {
    if (line.trim() && matchedRedLine(line)) {
      droppedLines++;
      continue;
    }
    kept.push(line);
  }
  const sanitized = kept.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  return { sanitized, droppedLines };
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

  const posts = [];
  let downloaded = 0;
  let filtered = 0;

  for (const p of raw) {
    const { sanitized, droppedLines } = sanitizeMessage(p.message);
    const photos = extractPhotos(p);
    if (!sanitized && photos.length === 0) {
      filtered++;
      console.log(`  filtered ${p.id} (empty after sanitization)`);
      continue;
    }
    if (droppedLines > 0) {
      console.log(`  redacted ${p.id} (${droppedLines} line(s) dropped)`);
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
    });
  }

  const out = { syncedAt: new Date().toISOString(), posts };
  await writeFile(JOURNAL_JSON, JSON.stringify(out, null, 2) + "\n");
  console.log(
    `Wrote ${posts.length} posts (filtered out ${filtered}); downloaded ${downloaded} new photos`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
