-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "ingestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "rawContent" JSONB;

-- CreateIndex
CREATE INDEX "Article_publishedAt_idx" ON "Article"("publishedAt");
