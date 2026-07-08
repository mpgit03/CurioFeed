
import ArticleCard from "./ArticleCard";
import {FeedListProps} from "@/types/feed"





export default function FeedList({articles , isFollowing , onFollow , onUnfollow ,isPending}:FeedListProps){
    return(
        <div className="space-y-6">
            {articles.map((article) => (
                <ArticleCard

                    key={article.id}
                    article={article}
                    isFollowing = {isFollowing(article.source.id)}
                    onFollow={onFollow}
                    onUnfollow={onUnfollow}
                    isPending={isPending(article.source.id)}
                    
                    
                />
            ))}
        </div>
    )
}