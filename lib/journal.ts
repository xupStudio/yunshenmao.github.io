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
  rawHash?: string;
  processorVersion?: string;
};

export type JournalDocument = {
  syncedAt: string;
  posts: JournalPost[];
};
