export type VerifiedType = "blue" | "business" | "none" | string;

export type BoardAccount = {
  id: string;
  username: string;
  display_name: string;
  followers: number;
  following?: number;
  verified_type?: VerifiedType | null;
  profile_image_url: string;
  profile_url: string;
};

export type Week = {
  iso_week: string;
  start: string;
  end: string;
  timezone: string;
  label: string;
};

export type Metrics = {
  likes: number;
  reposts: number;
  replies: number;
  quotes: number;
  bookmarks: number;
  impressions: number;
};

export type Media = {
  type: string;
  width?: number;
  height?: number;
  url?: string;
  preview_image_url?: string;
};

export type Author = {
  id?: string;
  username: string;
  name: string;
  verified?: boolean;
  verified_type?: VerifiedType | null;
  followers?: number;
  description?: string;
  profile_image_url?: string;
};

export type QuotedStub = {
  id?: string;
  url?: string;
  author_username?: string;
  text?: string;
};

export type OriginalPost = {
  id: string;
  url: string;
  created_at: string;
  author: Author;
  text: string;
  media?: Media[];
  metrics?: Metrics;
};

export type ReplyPost = {
  id: string;
  url: string;
  created_at: string;
  kind?: string;
  text: string;
  metrics?: Metrics;
  engagement_score?: number;
  themes?: string[];
  featured?: boolean;
  media?: Media[];
  quoted_post?: QuotedStub;
};

export type Pairing = {
  rank: number;
  relation: string;
  theme?: string;
  ranking: {
    tier?: string;
    tier_label: string;
    signal: string;
    score?: number;
    reason?: string;
  };
  original: OriginalPost;
  reply: ReplyPost;
};

export type Conversation = {
  with_username: string;
  summary: string;
  post_ids?: string[];
};

export type ThesisPost = {
  post_id: string;
  url: string;
  created_at: string;
  kind?: string;
  excerpt: string;
  excerpt_prefix?: string;
  excerpt_suffix?: string;
  context_username?: string | null;
};

export type ThesisThread = {
  theme?: string;
  label: string;
  posts: ThesisPost[];
};

export type MentionItem = {
  approval_status?: string;
  id?: string;
  url?: string;
  text?: string;
  created_at?: string;
  author?: Author;
  metrics?: Partial<Metrics>;
};

export type BoardFile = {
  schema_version?: string;
  account: BoardAccount;
  week: Week;
  generated_at: string;
  source?: {
    api?: string;
    posts_fetched?: number;
    originals_fetched?: number;
    mentions_fetched?: number;
    since_id?: string;
    notes?: string;
  };
  stats: {
    posts: number;
    originals: number;
    quotes: number;
    replies: number;
    reposts: number;
    pairings: number;
    featured_pairings: number;
    genuine_mentions: number;
    likes: number;
    impressions: number;
    follower_delta?: number | null;
  };
  theme_highlight: {
    theme: string;
    pull_quote: {
      text: string;
      post_id?: string;
      url: string;
      created_at: string;
      context_username?: string | null;
    };
    editor_note: string;
  };
  pairings: Pairing[];
  conversations: Conversation[];
  thesis_threads: ThesisThread[];
  top_posts?: unknown[];
  mentions: {
    featured?: MentionItem[];
    filtered_out_count?: number;
    self_mentions_excluded?: number;
    filter_reasons?: string[];
    empty_state?: string;
  };
  token: {
    symbol: string;
    name: string;
    network: string;
    token_id: string;
    hashscan_url: string;
    type: string;
    decimals: number;
    total_supply: string;
    treasury: string;
    created?: string;
    copy: string;
    source?: string;
  };
  profile_note: {
    text: string;
    url: string;
    handle: string;
  };
  review: {
    status: string;
    approved_by?: string | null;
    approved_at?: string | null;
    preview_url?: string;
  };
};
