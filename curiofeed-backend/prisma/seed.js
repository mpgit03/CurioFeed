import prisma from "../src/lib/prisma.js";

const topics = [
{
name: "Artificial Intelligence",
slug: "artificial-intelligence",
},
{
name: "Programming",
slug: "programming",
},
{
name: "Startups",
slug: "startups",
},
{
name: "Technology",
slug: "technology",
},
{
name: "Finance",
slug: "finance",
},
{
name: "Science",
slug: "science",
},
{
name: "World News",
slug: "world-news",
},
{
name: "Business",
slug: "business",
},
{
name: "Productivity",
slug: "productivity",
},
{
name: "Design",
slug: "design",
},
];

async function seedTopics() {
try {
await prisma.topic.createMany({
data: topics,
skipDuplicates: true,
});


console.log(
  "Topics seeded successfully"
);


} catch (error) {
console.error(
"Error seeding topics:",
error
);
} finally {
await prisma.$disconnect();
}
}

seedTopics();
