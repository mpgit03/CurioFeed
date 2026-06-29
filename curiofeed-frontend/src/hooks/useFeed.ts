"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

import { getFeed } from "@/services/feed";
import { FeedArticle } from "@/types/feed";


export function useFeed() {

const [articles, setArticles] = useState<FeedArticle[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const {getToken} = useAuth();   

const loadFeed = useCallback(async()=>{
    try {
      setLoading(true);
      setError(null);

      const token = await getToken();

      if (!token) {
        throw new Error("Authentication failed");
      }

      const articles = await getFeed(token);

      setArticles(articles);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
},[getToken]);

useEffect(()=>{
    loadFeed();
},[loadFeed])


return {
    articles,
    loading,
    error,
    loadFeed,

};


}

