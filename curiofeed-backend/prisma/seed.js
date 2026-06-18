import prisma from "../src/lib/prisma.js";
import {
  seedTopics,
  seedSources,
} from "./seed/index.js";

async function main() {
  try {
    await seedTopics();
    await seedSources();
    

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();