import initialJournal from "../../../data/journal.json";
import {
  JOURNAL_OBJECT_KEY,
  loadJournal,
  syncJournal,
} from "./sync";
import type { JournalDocument, SiteEnv } from "./types";

const FALLBACK_JOURNAL = initialJournal as JournalDocument;
const JOURNAL_API_PATH = "/api/journal";
const PHOTO_PREFIX = "/photos/journal/";

function jsonResponse(
  document: JournalDocument,
  request: Request,
): Response {
  const etag = `W/"${document.syncedAt}"`;
  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304, headers: { ETag: etag } });
  }

  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, max-age=60",
    ETag: etag,
    "X-Content-Type-Options": "nosniff",
  });
  const body =
    request.method === "HEAD" ? null : JSON.stringify(document);
  return new Response(body, { status: 200, headers });
}

async function journalPhotoResponse(
  request: Request,
  env: SiteEnv,
): Promise<Response> {
  const url = new URL(request.url);
  const key = decodeURIComponent(url.pathname.slice(1));
  if (!key.startsWith("photos/journal/") || key.includes("..")) {
    return new Response("Not found", { status: 404 });
  }

  const object = await env.JOURNAL_STORAGE.get(key);
  if (!object) return env.ASSETS.fetch(request);

  const etag = object.httpEtag;
  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304, headers: { ETag: etag } });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("ETag", etag);
  headers.set(
    "Cache-Control",
    headers.get("Cache-Control") ||
      "public, max-age=31536000, immutable",
  );
  headers.set("X-Content-Type-Options", "nosniff");

  return new Response(request.method === "HEAD" ? null : object.body, {
    status: 200,
    headers,
  });
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === JOURNAL_API_PATH) {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return new Response("Method not allowed", {
          status: 405,
          headers: { Allow: "GET, HEAD" },
        });
      }
      const document = await loadJournal(
        env.JOURNAL_STORAGE,
        FALLBACK_JOURNAL,
      );
      return jsonResponse(document, request);
    }

    if (url.pathname.startsWith(PHOTO_PREFIX)) {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return new Response("Method not allowed", {
          status: 405,
          headers: { Allow: "GET, HEAD" },
        });
      }
      return journalPhotoResponse(request, env);
    }

    return env.ASSETS.fetch(request);
  },

  async scheduled(controller, env): Promise<void> {
    const result = await syncJournal(env, FALLBACK_JOURNAL);
    console.log("journal_sync_completed", {
      cron: controller.cron,
      scheduledTime: new Date(controller.scheduledTime).toISOString(),
      ...result,
    });
  },
} satisfies ExportedHandler<SiteEnv>;

export { JOURNAL_OBJECT_KEY };
