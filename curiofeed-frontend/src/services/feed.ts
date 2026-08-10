import { FeedArticle, FeedTopic } from "@/types/feed";



const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL;

interface TopicsResponse {
  success: boolean;
  data: FeedTopic[];
}

interface PreferencesPayload {
  topicIds: string[];
}

interface FeedResponse {
  success: boolean;
  feed: FeedArticle[];
}

export async function getTopics(): Promise<FeedTopic[]> {
  const response = await fetch(
    `${API_URL}/api/v1/topics`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch topics");
  }

  const data: TopicsResponse =
    await response.json();

  return data.data;
}

export async function savePreferences({
  token,
  topicIds,
}: {
  token: string;
  topicIds: string[];
}) {
  const response = await fetch(
    `${API_URL}/api/v1/users/preferences`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        topicIds,
      } satisfies PreferencesPayload),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Failed to save preferences");
  }

  return data;
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




export async function getFollowedSourceIds( { token } :{ token : string }) {
  
    const response = await fetch(
      `${API_URL}/api/v1/users/me/following`,
      {
        headers:{
          Authorization: `Bearer ${token}`,
        },
      },
    );

      if (!response.ok) {
      throw new Error("Failed to fetch sourceIds");
    };

    const data = await response.json();

    const {followedSources} = data;
    
    return new Set<string>(  followedSources.map( (source: { id: string }) => source.id)  ); 

}

export async function follow({sourceId,token}:{ sourceId:string,token:string}) {
  
  const response = await fetch(
    `${API_URL}/api/v1/sources/${sourceId}/follow`,
    {
      method:"POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    );
  
  const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
  }

return data;
    
}

export async function unfollow({sourceId,token}:{ sourceId:string,token:string}) {
  
  
  const response = await fetch(
    `${API_URL}/api/v1/sources/${sourceId}/follow`,
    {
      method:"DELETE",
      headers:{
        Authorization:`Bearer ${token}`,
      },
    },
  );
  
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;

  
    
}