-- CreateEnum
CREATE TYPE "ClassificationSource" AS ENUM ('SOURCE_CATEGORY', 'RULE_BASED', 'AI');

-- CreateTable
CREATE TABLE "ArticleTopic" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "classifiedBy" "ClassificationSource" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArticleTopic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ArticleTopic_articleId_idx" ON "ArticleTopic"("articleId");

-- CreateIndex
CREATE INDEX "ArticleTopic_topicId_idx" ON "ArticleTopic"("topicId");

-- CreateIndex
CREATE INDEX "ArticleTopic_topicId_confidence_idx" ON "ArticleTopic"("topicId", "confidence");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleTopic_articleId_topicId_key" ON "ArticleTopic"("articleId", "topicId");

-- AddForeignKey
ALTER TABLE "ArticleTopic" ADD CONSTRAINT "ArticleTopic_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleTopic" ADD CONSTRAINT "ArticleTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
