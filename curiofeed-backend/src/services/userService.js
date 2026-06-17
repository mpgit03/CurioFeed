import prisma from "../lib/prisma.js";

export const updateUserPreferences =
async (clerkId, topicIds) => {
  
const user =
  await prisma.user.findUnique({
    where: {
      clerkId,
    },
  });

if (!user) {
  throw new Error(
    "User not found"
  );
}

const preferencesData =
  topicIds.map(
    (topicId) => ({
      userId: user.id,
      topicId,
    })
  );

await prisma.$transaction(
  async (tx) => {

    await tx.userPreference
      .deleteMany({
        where: {
          userId: user.id,
        },
      });

    await tx.userPreference
      .createMany({
        data: preferencesData,
      });

    await tx.user.update({
      where: {
        clerkId,
      },
      data: {
        onboardingCompleted:
          true,
      },
    });
  }
);

};