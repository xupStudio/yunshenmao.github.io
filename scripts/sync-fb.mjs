#!/usr/bin/env node
import { writeFile, mkdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";

const PAGE_ID = "61579639902271";
const POSTS_LIMIT = 30;
const API_VERSION = "v21.0";
const TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
const ROOT = process.cwd();
const JOURNAL_JSON = join(ROOT, "data", "journal.json");
const PHOTO_DIR_REL = "public/photos/journal";

if (!TOKEN) {
  console.error("FB_PAGE_ACCESS_TOKEN env var is required");
  process.exit(1);
}

async function fetchPosts() {
  const url = new URL(`https://graph.facebook.com/${API_VERSION}/${PAGE_ID}/posts`);
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
  console.log(`Fetching last ${POSTS_LIMIT} posts from page ${PAGE_ID}...`);
  const raw = await fetchPosts();
  console.log(`Got ${raw.length} posts from API`);

  const posts = [];
  let downloaded = 0;

  for (const p of raw) {
    const photos = extractPhotos(p);
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
      message: p.message ?? "",
      permalink: p.permalink_url,
      photos: localPhotos,
    });
  }

  const out = { syncedAt: new Date().toISOString(), posts };
  await writeFile(JOURNAL_JSON, JSON.stringify(out, null, 2) + "\n");
  console.log(`Wrote ${posts.length} posts; downloaded ${downloaded} new photos`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
