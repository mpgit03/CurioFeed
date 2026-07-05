import { PAGE_SIZE,
        MAX_PER_TOPIC,
        MAX_PER_SOURCE 
} from "../constants/feed.js"

function getPrimaryTopic(article) {
    if (!article.articleTopics?.length) {
        return null;
    }

    return article.articleTopics.reduce((best, current) =>
        current.confidence > best.confidence ? current : best
    ).topicId;
}




export function buildRankedFeed(
    candidates,
    {
        PAGE_SIZE = 20,
        MAX_PER_TOPIC = 3,
        MAX_PER_SOURCE = 2,
    } = {}
) {
    const rankedFeed = [];
    let remainingQueue = [...candidates];

    let round = 0;

    while (remainingQueue.length > 0) {
        const topicCounts = new Map();
        const sourceCounts = new Map();

        const accepted = [];
        const skipped = [];

        // Relax diversity constraints after each round.
        const topicLimit =
            round === 0
                ? MAX_PER_TOPIC
                : round === 1
                ? MAX_PER_TOPIC + 1
                : Infinity;

        const sourceLimit =
            round === 0
                ? MAX_PER_SOURCE
                : round === 1
                ? MAX_PER_SOURCE + 1
                : Infinity;

        for (const article of remainingQueue) {
            // Current page is full.
            if (accepted.length === PAGE_SIZE) {
                skipped.push(article);
                continue;
            }

            const primaryTopic = getPrimaryTopic(article);

            const topicCount = primaryTopic
                ? topicCounts.get(primaryTopic) ?? 0
                : 0;

            const sourceCount =
                sourceCounts.get(article.sourceId) ?? 0;

            const exceedsTopic =
                primaryTopic && topicCount >= topicLimit;

            const exceedsSource =
                sourceCount >= sourceLimit;

            if (exceedsTopic || exceedsSource) {
                skipped.push(article);
                continue;
            }

            accepted.push(article);

            if (primaryTopic) {
                topicCounts.set(primaryTopic, topicCount + 1);
            }

            sourceCounts.set(
                article.sourceId,
                sourceCount + 1
            );
        }

        // Safety: if nothing could be accepted, append the rest
        // in recency order and terminate.
        if (accepted.length === 0) {
            rankedFeed.push(...remainingQueue);
            break;
        }

        rankedFeed.push(...accepted);

        remainingQueue = skipped;

        round++;
    }

    return rankedFeed;
}







/*                                             */




export function applyFeedDiversity(articles, maxArticles) {
    const selected = [];
    const skipped = [];

    const topicCounts = new Map();
    const sourceCounts = new Map();

    for (const article of articles) {
        const topicId = getPrimaryTopic(article);
        const sourceId = article.sourceId;

        const topicCount = topicId
            ? (topicCounts.get(topicId) ?? 0)
            : 0;

        const sourceCount = sourceCounts.get(sourceId) ?? 0;

        const exceedsTopic =
            topicId && topicCount >= MAX_PER_TOPIC;

        const exceedsSource =
            sourceCount >= MAX_PER_SOURCE;

        if (exceedsTopic || exceedsSource) {
            skipped.push(article);
            continue;
        }

        selected.push(article);

        if (topicId) {
            topicCounts.set(topicId, topicCount + 1);
        }

        sourceCounts.set(sourceId, sourceCount + 1);

        if (selected.length === maxArticles) {
            return selected;
        }
    }

    // Second pass: relax diversity rules
    for (const article of skipped) {
        if (selected.length === maxArticles) {
            break;
        }

        selected.push(article);
    }

    return selected;
}
