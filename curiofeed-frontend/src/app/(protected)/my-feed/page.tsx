'use client';

import FeedList from "@/components/feed/FeedList";

import LoadingFeed from "@/components/feed/LoadingFeed";
import EmptyFeed from "@/components/feed/EmptyFeed";
import ErrorFeed from "@/components/feed/ErrorFeed";
import { useArticles} from "@/hooks/useArticles";
import { useFollowedSources } from "@/hooks/useFollowedSources";





export default function MyFeedPage() {

const {
        articles,
        loading,
        error,
        loadFeed,
    } = useArticles("/api/v1/feed");

    const {
        loading:sourcesLoading,
        error:sourceError,
        followedSourceIds,
        isFollowing,
        followSource,
        unfollowSource,
        isPending,
    
    } = useFollowedSources();

if (loading) {
    return <LoadingFeed />;
}

if (error) {
    return <ErrorFeed message={error} onRetry = {loadFeed}/>;
}

if (articles.length === 0) {
    return (
  <EmptyFeed
    title="Your feed is empty"
    description="We couldn't find any articles matching your interests yet. Try updating your preferences or explore new topics."
    primaryAction={{
      href: "/explore",
      label: "Explore Articles",
    }}
    secondaryAction={{
      href: "/preferences",
      label: "Update Interests",
    }}
  />
);
}

return <FeedList articles={articles}
                isFollowing={isFollowing}
                onFollow={followSource}
                onUnfollow={unfollowSource}
                isPending = {isPending} />;
  

    
}

