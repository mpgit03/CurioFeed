import { FeedArticle } from "@/types/feed";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL;

interface FeedResponse {
  success: boolean;
  feed: FeedArticle[];
}

export async function getArticles(
  endpoint: string,
  token: string
): Promise<FeedArticle[]> {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data: FeedResponse =
    await response.json();

  return data.feed;
}