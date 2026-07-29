export type JournalPhoto = {
  src: string;
  width?: number;
  height?: number;
};

export type JournalPost = {
  id: string;
  createdAt: string;
  message: string;
  permalink: string;
  photos: JournalPhoto[];
  edited?: boolean;
  rewritten?: boolean;
  rawHash: string;
  processorVersion?: string;
};

export type JournalDocument = {
  syncedAt: string;
  posts: JournalPost[];
};

export interface SiteEnv {
  ASSETS: Fetcher;
  JOURNAL_STORAGE: R2Bucket;
  FB_PAGE_ACCESS_TOKEN: string;
  GEMINI_API_KEY: string;
  FACEBOOK_API_VERSION: string;
  GEMINI_MODEL: string;
}

export type SyncResult = {
  fetched: number;
  published: number;
  cacheHits: number;
  rewrittenLines: number;
  droppedLines: number;
  filteredPosts: number;
  uploadedPhotos: number;
  syncedAt: string;
};
