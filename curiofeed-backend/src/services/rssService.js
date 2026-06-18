import Parser from "rss-parser";

const parser = new Parser();

export async function fetchFeed(rssUrl) {
  try {
    const feed = await parser.parseURL(rssUrl);

    return feed.items.map((item) => ({
      title: item.title ?? null,

      description:
        item.contentSnippet ??
        item.summary ??
        item.content ??
        null,

      url: item.link ?? null,

      author:
        item.creator ??
        item.author ??
        null,

      imageUrl: null,

      publishedAt: item.isoDate
        ? new Date(item.isoDate)
        : item.pubDate
            ? new Date(item.pubDate)
            : null,

      rawContent: item,
    }));
  } catch (error) {
    throw new Error(
      `Failed to fetch RSS feed: ${rssUrl}`
    );
  }
}