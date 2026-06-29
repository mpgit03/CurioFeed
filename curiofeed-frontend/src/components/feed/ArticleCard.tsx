import Link from "next/link";

import { FeedArticle } from "@/types/feed";

import TopicBadge from "./TopicBadge";
import SourceBadge from "./SourceBadge";
import {formatRelativeTime} from "../../utils/date"

interface ArticleCardProps {
  article: FeedArticle;
}

export default function ArticleCard({
  article,
}: ArticleCardProps) {
  return (
    <Link href={article.url} target="_blank">

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

          <SourceBadge source={article.source.name} />

          <span className="text-sm text-gray-500">
            {formatRelativeTime(article.publishedAt)}
          </span>

        </div>

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

      </article>

    </Link>
  );
}