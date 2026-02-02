/*
  Warnings:

  - You are about to drop the column `category_id` on the `blog_posts` table. All the data in the column will be lost.
  - You are about to drop the `blog_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "blog_posts" DROP CONSTRAINT "blog_posts_category_id_fkey";

-- DropIndex
DROP INDEX "blog_posts_category_id_idx";

-- AlterTable
ALTER TABLE "blog_posts" DROP COLUMN "category_id";

-- DropTable
DROP TABLE "blog_categories";
