/*
  Warnings:

  - The values [RESEARCH] on the enum `SourceCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SourceCategory_new" AS ENUM ('AI', 'ENGINEERING', 'STARTUPS', 'PRODUCT', 'SCIENCE', 'BUSINESS', 'DESIGN', 'HUMANITIES');
ALTER TABLE "Source" ALTER COLUMN "category" TYPE "SourceCategory_new" USING ("category"::text::"SourceCategory_new");
ALTER TYPE "SourceCategory" RENAME TO "SourceCategory_old";
ALTER TYPE "SourceCategory_new" RENAME TO "SourceCategory";
DROP TYPE "public"."SourceCategory_old";
COMMIT;
