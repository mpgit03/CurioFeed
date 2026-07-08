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