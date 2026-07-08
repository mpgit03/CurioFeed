"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

import { getArticles } from "@/services/feed";
import { FeedArticle } from "@/types/feed";


export function useArticles(endpoint:string) {

const [articles, setArticles] = useState<FeedArticle[]>([]);
const [page, setPage] = useState(1);

const PAGE_SIZE = 20;

const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const {getToken} = useAuth();   

const changePage = (newPage: number) => {
    setPage(newPage);

    const start = (newPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

};
const hasMore = page * PAGE_SIZE < articles.length;

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

    setPage(1);




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


function removeArticlesBySource(sourceId:string){
  setArticles(prev=>
    prev.filter(article => article.source.id !== sourceId)
  );
}



useEffect(() => {
  console.log("useEffect");
  loadFeed();
}, [loadFeed]);


return {
    articles,
    loading,
    error,
    loadFeed,
    page,
    setPage:changePage,
    hasMore,
    removeArticlesBySource,

};


}

