import Link from "next/link";

import TopicBadge from "./TopicBadge";
import SourceBadge from "./SourceBadge";
import { formatRelativeTime } from "../../utils/date";
import { ArticleCardProps } from "@/types/feed";
import { isPageStatic } from "next/dist/build/utils";

export default function ArticleCard({
  article,
  isFollowing,
  onFollow,
  onUnfollow,
  isPending,
}: ArticleCardProps) {
  const handleFollowClick = () => {
    console.log("clicked");
  if (isFollowing) {
    console.log("calling unfollow");
    onUnfollow(article.source.id);
  } else {
    console.log("calling follow");
    onFollow(article.source.id);
  }
};

  return (
    <article
      className="
        group
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        transition-all
        duration-200
        hover:border-gray-300
        hover:shadow-sm
      "
    >
      {/* Header */}

      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
        <SourceBadge source={article.source.name} />

        <button
          type="button"
          disabled = {isPending}
          onClick={handleFollowClick}
          className={`
                rounded-md px-3 py-1 text-sm font-medium transition
                ${isPending ? "opacity-50 cursor-not-allowed" : ""}
                ${
                    isFollowing
                        ? "border border-gray-300 bg-gray-100 text-gray-700"
                        : "bg-black text-white"
                }
            `}
        >
          {isPending  ? "Loading..." : isFollowing ? "Following" : "Follow"} 
        </button>
      </div>

        <span className="text-sm text-gray-500">
          {formatRelativeTime(article.publishedAt)}
        </span>
      </div>

      {/* Everything below opens the article */}

      <Link
        href={article.url}
        target="_blank"
        className="block"
      >
        {/* Title */}

        <h2
          className="
            mb-3
            text-2xl
            font-bold
            leading-tight
            text-gray-900
            transition-colors
            group-hover:text-black
          "
        >
          {article.title}
        </h2>

        {/* Description */}

        {article.description && (
          <p
            className="
              mb-5
              line-clamp-2
              text-base
              leading-7
              text-gray-600
            "
          >
            {article.description}
          </p>
        )}

        {/* Topics */}

        <div className="mb-5 flex flex-wrap gap-2">
          {article.articleTopics.map(({ topic }) => (
            <TopicBadge
              key={topic.id}
              topic={topic.name}
            />
          ))}
        </div>

        {/* Footer */}

        <span
          className="
            text-sm
            font-medium
            text-gray-900
            transition-colors
            group-hover:text-blue-600
          "
        >
          Read article →
        </span>
      </Link>
    </article>
  );
}