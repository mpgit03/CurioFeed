import { isEmpty } from "bullmq";
import Parser from "rss-parser";

const parser = new Parser();

export default async function verifyFeed(feedUrl) {
  try {
    const start = Date.now();
    const feed = await parser.parseURL(feedUrl);
    const responsetime = Date.now()-start;

    const hasCategories = feed.items.some(
        item => item.categories?.length > 0
        );

    const hasAuthors = feed.items.some(
        item =>
            item.author ||
            item.creator ||
            item["dc:creator"]
        );

    


 
    return {
      success: true,

      responsetime:responsetime,

      feedTitle: feed.title,

      items: feed.items.length,

      hasCategories: hasCategories,

      hasAuthors: hasAuthors,

      sampleItem:
        feed.items[0]
          ? {
              title: feed.items[0].title,
              link: feed.items[0].link,
              categories:
                feed.items[0].categories || [],
            }
          : null,
    };
  } catch (error) {
    return {
      success: false,

      error: error.message,
    };
  }
}