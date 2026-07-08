'use client';

import FeedList from "@/components/feed/FeedList";

import LoadingFeed from "@/components/feed/LoadingFeed";
import EmptyFeed from "@/components/feed/EmptyFeed";
import ErrorFeed from "@/components/feed/ErrorFeed";
import {useArticles} from "@/hooks/useArticles";
import Pagination from "@/components/feed/Pagination"
import {PAGE_SIZE} from "@/constants/feed"
import { useFollowedSources } from "@/hooks/useFollowedSources";





export default function FollowingPage() {




const {
        articles,
        loading,
        error,
        loadFeed,
        page,
        setPage,
        hasMore,
        removeArticlesBySource,
    } = useArticles("/api/v1/feed/following");

const visibleArticles = articles.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
);

const {
    loading:sourcesLoading,
    error:sourceError,
    followedSourceIds,
    isFollowing,
    followSource,
    unfollowSource,
    isPending,
} = useFollowedSources();

async function handleUnfollow(sourceId:string) {
    await unfollowSource(sourceId);
    removeArticlesBySource(sourceId);
}

if (loading) {
    return <LoadingFeed />;
}

if (error) {
    return <ErrorFeed message={error} onRetry = {loadFeed}/>;
}

if (articles.length === 0) {
    return (
  <EmptyFeed
    title="You're not following any sources yet"
    description="Follow your favorite publishers to see their latest articles here."
    primaryAction={{
      href: "/explore",
      label: "Explore Articles",
    }}
  />
);
}


return (
    <>
         <FeedList articles={visibleArticles}
                isFollowing={isFollowing}
                onFollow={followSource}
                onUnfollow={handleUnfollow}
                isPending = {isPending} />

        <Pagination
            page={page}
            hasMore={hasMore}
            onPrevious={() => setPage(page - 1)}
            onNext={() => setPage(page + 1)}
        />
    </>
);
  

    
}



