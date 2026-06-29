'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

import FeedList from "@/components/feed/FeedList";
import { getFeed } from "@/services/feed";
import { FeedArticle } from "@/types/feed";
import LoadingFeed from "@/components/feed/LoadingFeed";
import EmptyFeed from "@/components/feed/EmptyFeed";
import ErrorFeed from "@/components/feed/ErrorFeed";
import {useFeed} from "@/hooks/useFeed";





export default function MyFeedPage() {

const {
        articles,
        loading,
        error,
        loadFeed,
    } = useFeed();

if (loading) {
    return <LoadingFeed />;
}

if (error) {
    return <ErrorFeed message={error} onRetry = {loadFeed}/>;
}

if (articles.length === 0) {
    return <EmptyFeed />;
}

return <FeedList articles={articles} />;
  

    
}

