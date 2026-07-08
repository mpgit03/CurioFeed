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

export interface FeedListProps {
    articles: FeedArticle[];
    isFollowing: (sourceId: string) => boolean;
    onFollow: (sourceId: string) => void;
    onUnfollow: (sourceId: string) => void;
    isPending:(sourceId : string) => boolean,
}


export interface ArticleCardProps {
  article: FeedArticle;
  isFollowing:Boolean,
  onFollow:(sourceId: string) => void,
  onUnfollow:(sourceId: string) => void,
  isPending:boolean,
  
}