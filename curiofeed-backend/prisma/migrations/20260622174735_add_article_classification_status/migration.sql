/*
  Warnings:

  - You are about to drop the column `aiProcessed` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "aiProcessed",
ADD COLUMN     "topicsClassified" BOOLEAN NOT NULL DEFAULT false;
