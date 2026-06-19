export function classifyArticle(article) {
  const topics = new Set();

  const text = [
    article.title,
    article.description,
    ...(article.rawContent?.categories || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // AI

  if (
    text.includes("ai") ||
    text.includes("artificial intelligence") ||
    text.includes("llm") ||
    text.includes("gpt") ||
    text.includes("agent")
  ) {
    topics.add("Artificial Intelligence");
  }

  // Programming

  if (
    text.includes("programming") ||
    text.includes("developer") ||
    text.includes("software") ||
    text.includes("engineering") ||
    text.includes("architecture")
  ) {
    topics.add("Programming");
  }

  // Science

  if (
    text.includes("research") ||
    text.includes("science") ||
    text.includes("biology") ||
    text.includes("disease") ||
    text.includes("medical")
  ) {
    topics.add("Science");
  }

  // Startups

  if (
    text.includes("startup") ||
    text.includes("founder") ||
    text.includes("venture") ||
    text.includes("yc") ||
    text.includes("funding")
  ) {
    topics.add("Startups");
  }

  // Business

  if (
    text.includes("business") ||
    text.includes("market") ||
    text.includes("revenue") ||
    text.includes("growth")
  ) {
    topics.add("Business");
  }

  switch (article.source.category) {
  case "AI":
    topics.add("Artificial Intelligence");
    break;

  case "ENGINEERING":
    topics.add("Programming");
    break;

  case "SCIENCE":
    topics.add("Science");
    break;

  case "STARTUPS":
    topics.add("Startups");
    break;

  case "BUSINESS":
    topics.add("Business");
    break;
}

  return [...topics];
}