"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

import { getArticles } from "@/services/feed";
import { FeedArticle } from "@/types/feed";


export function useArticles(endpoint:string) {

const [articles, setArticles] = useState<FeedArticle[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const {getToken} = useAuth();   

const loadFeed = useCallback(async () => {
  console.log("loadFeed called");

  try {
    setLoading(true);
    setError(null);

    console.log("Getting token...");

    const token = await getToken();

    console.log("Token:", token);

    if (!token) {
      throw new Error("Authentication failed");
    }

    console.log("Fetching articles...");

    const articles = await getArticles(endpoint, token);

    console.log("Fetched:", articles.length);

    setArticles(articles);
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("Something went wrong");
    }
  } finally {
    setLoading(false);
  }
}, [getToken, endpoint]);

useEffect(() => {
  console.log("useEffect");
  loadFeed();
}, [loadFeed]);


return {
    articles,
    loading,
    error,
    loadFeed,

};


}

