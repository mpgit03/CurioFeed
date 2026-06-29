import { FeedArticle } from "@/types/feed";
import ArticleCard from "./ArticleCard";

interface FeedListProps{
    articles:FeedArticle[];
}


export default function FeedList({articles}:FeedListProps){
    return(
        <div className="space-y-6">
            {articles.map((article) => (
                <ArticleCard
                    key={article.id}
                    article={article}
                />
            ))}
        </div>
    )
}