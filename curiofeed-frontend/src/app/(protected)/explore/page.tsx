'use client';

import FeedList from "@/components/feed/FeedList";

import LoadingFeed from "@/components/feed/LoadingFeed";
import EmptyFeed from "@/components/feed/EmptyFeed";
import ErrorFeed from "@/components/feed/ErrorFeed";
import {useArticles} from "@/hooks/useArticles";
import Pagination from "@/components/feed/Pagination"
import {PAGE_SIZE} from "@/constants/feed"
import { useFollowedSources } from "@/hooks/useFollowedSources";





export default function MyFeedPage() {

const {
        articles,
        loading,
        error,
        loadFeed,
        page,
        setPage,
        hasMore,
    } = useArticles("/api/v1/feed/explore");

const {
    loading:sourcesLoading,
    error:sourceError,
    followedSourceIds,
    isFollowing,
    followSource,
    unfollowSource,
    isPending,


} = useFollowedSources();



const visibleArticles = articles.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
);

if (loading) {
    return <LoadingFeed />;
}

if (error) {
    return <ErrorFeed message={error} onRetry = {loadFeed}/>;
}

if (articles.length === 0) {
    return (
  <EmptyFeed
    title="No articles available"
    description="There are no articles to explore right now. Please check back in a little while."
    primaryAction={{
      href: "/",
      label: "Go to My Feed",
    }}
  />
);
}


return (
    <>
        <FeedList articles={visibleArticles}
                isFollowing={isFollowing}
                onFollow={followSource}
                onUnfollow={unfollowSource}
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



