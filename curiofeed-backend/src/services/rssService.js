import Parser from "rss-parser";
import {ApiError} from "../utils/ApiError.js"
import { serviceLogger } from "../lib/logger.js";

const parser = new Parser();

export async function fetchFeed(source) {
  try {
    const feed = await parser.parseURL(source.rssUrl);

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

    serviceLogger.error({
        sourceId: source.id,
        source: source.name,
        rssUrl: source.rssUrl,
        err: error,
    }, "RSS fetch failed");


      throw new ApiError(
          502,
          `Failed to fetch RSS feed for '${source.name}'.`
      );
}
}