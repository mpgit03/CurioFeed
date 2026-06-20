import verifyFeed from "../services/feedverifiedService.js";

const urls = [
        "https://www.smashingmagazine.com/feed/",
        "https://alistapart.com/main/feed/",
        "https://www.ben-evans.com/benedictevans?format=rss",
        "https://fs.blog/feed/",
        "https://collabfund.com/blog/feed/",
        "https://ourworldindata.org/feed.xml"
    // "https://www.figma.com/blog/feed/atom.xml",
    // "https://a16z.com/feed/",
    // "https://www.quantamagazine.org/feed/",
    // "https://linear.app/blog/rss.xml",
    // "https://feed.infoq.com",
    // "https://medium.com/feed/@netflixtechblog"


];

for (const url of urls) {


  const report = await verifyFeed(url);

  console.log("\n====================");
  console.log(`URL: ${url}`);
  console.log(report);
}