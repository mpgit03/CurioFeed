import { enqueueTestjobs } from "./producers/testproducer.js";

await enqueueTestjobs({
  sourceId: "openai-blog",
});

console.log("✅ Job Added");

process.exit(0);