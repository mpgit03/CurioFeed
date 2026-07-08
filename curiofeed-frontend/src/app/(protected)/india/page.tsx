'use client';

import FeedList from "@/components/feed/FeedList";
import Pagination from "@/components/feed/Pagination";
import LoadingFeed from "@/components/feed/LoadingFeed";
import EmptyFeed from "@/components/feed/EmptyFeed";
import ErrorFeed from "@/components/feed/ErrorFeed";
import { useArticles } from "@/hooks/useArticles";
import { PAGE_SIZE } from "@/constants/feed";
import { useFollowedSources } from "@/hooks/useFollowedSources";

export default function IndiaPage() {
    const {
        articles,
        loading,
        error,
        loadFeed,
        page,
        setPage,
        hasMore,
    } = useArticles("/api/v1/feed/india");

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
        return (
            <ErrorFeed
                message={error}
                onRetry={loadFeed}
            />
        );
    }

    if (articles.length === 0) {
        return (
        <EmptyFeed
            title="No India-related articles available"
            description="We couldn't find any India-related articles at the moment."
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