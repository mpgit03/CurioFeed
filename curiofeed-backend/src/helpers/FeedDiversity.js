const MAX_PER_TOPIC = 3;
const MAX_PER_SOURCE = 2;

function getPrimaryTopic(article) {
    if (!article.articleTopics?.length) {
        return null;
    }

    return article.articleTopics.reduce((best, current) =>
        current.confidence > best.confidence ? current : best
    ).topicId;
}

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