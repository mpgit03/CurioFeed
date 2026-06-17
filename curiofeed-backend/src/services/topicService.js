import prisma from "../lib/prisma.js";

export const getTopics = async () => {
  return prisma.topic.findMany({
    orderBy: {
      name: "asc",
    },
  });
};