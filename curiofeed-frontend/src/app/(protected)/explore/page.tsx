'use client';

import FeedList from "@/components/feed/FeedList";

import LoadingFeed from "@/components/feed/LoadingFeed";
import EmptyFeed from "@/components/feed/EmptyFeed";
import ErrorFeed from "@/components/feed/ErrorFeed";
import {useArticles} from "@/hooks/useArticles";





export default function MyFeedPage() {

const {
        articles,
        loading,
        error,
        loadFeed,
    } = useArticles("/api/v1/feed/explore");

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

