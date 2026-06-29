export interface FeedTopic {
  id: string;
  name: string;
}

export interface FeedSource {
  id: string;
  name: string;
}

export interface FeedArticle {
  id: string;

  title: string;

  description: string | null;

  url: string;

  publishedAt: string;

  score: number;

  source: FeedSource;

  articleTopics: {
    confidence: number;
    topic: FeedTopic;
  }[];
}