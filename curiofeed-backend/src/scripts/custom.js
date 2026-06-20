import Parser from "rss-parser";

const parser = new Parser();

const sources = [
    "https://review.firstround.com/glossary/rss/"
       
    //    "https://feed.infoq.com/"

];

for (const source of sources) {
  try {
    const feed = await parser.parseURL(source);

    console.log("\n====================");
    console.log(source);
    console.log("Feed items:", feed.items.length);
    for (const item of feed.items.slice(0,10)) {
    console.log(item.title);
    console.log(item.pubDate);
    }

  } catch (error) {

    console.log("\n====================");
    console.log(source);
    console.log("Failed:", error.message);

  }
}


// [
//     "",
// ]