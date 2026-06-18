import prisma from "../../src/lib/prisma.js";
import { topics } from "./topics.seed.js";
import { sources } from "./sources.seed.js";

export async function seedTopics() {
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



export async function seedSources() {
  await prisma.source.createMany({
    data: sources,
    skipDuplicates: true,
  });

  console.log("Sources seeded");
}