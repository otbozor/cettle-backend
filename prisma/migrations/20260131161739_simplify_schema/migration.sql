/*
  Warnings:

  - You are about to drop the column `ip_hash` on the `audit_logs` table. All the data in the column will be lost.
  - You are about to drop the column `birth_year` on the `horse_listings` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `horse_listings` table. All the data in the column will be lost.
  - You are about to drop the column `phone_visible` on the `horse_listings` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `horse_listings` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `horse_media` table. All the data in the column will be lost.
  - You are about to drop the column `ip_hash` on the `view_logs` table. All the data in the column will be lost.
  - You are about to drop the column `user_agent_hash` on the `view_logs` table. All the data in the column will be lost.
  - You are about to drop the `banners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `blog_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `blog_post_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `blog_posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `blog_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kopkari_events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `report_complaints` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "blog_post_tags" DROP CONSTRAINT "blog_post_tags_post_id_fkey";

-- DropForeignKey
ALTER TABLE "blog_post_tags" DROP CONSTRAINT "blog_post_tags_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "blog_posts" DROP CONSTRAINT "blog_posts_category_id_fkey";

-- DropForeignKey
ALTER TABLE "kopkari_events" DROP CONSTRAINT "kopkari_events_district_id_fkey";

-- DropForeignKey
ALTER TABLE "kopkari_events" DROP CONSTRAINT "kopkari_events_organizer_user_id_fkey";

-- DropForeignKey
ALTER TABLE "kopkari_events" DROP CONSTRAINT "kopkari_events_region_id_fkey";

-- DropForeignKey
ALTER TABLE "product_media" DROP CONSTRAINT "product_media_product_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropForeignKey
ALTER TABLE "report_complaints" DROP CONSTRAINT "report_complaints_reporter_user_id_fkey";

-- DropForeignKey
ALTER TABLE "report_complaints" DROP CONSTRAINT "report_complaints_target_id_fkey";

-- DropIndex
DROP INDEX "audit_logs_created_at_idx";

-- DropIndex
DROP INDEX "favorites_listing_id_idx";

-- DropIndex
DROP INDEX "horse_listings_breed_id_idx";

-- DropIndex
DROP INDEX "horse_listings_district_id_idx";

-- DropIndex
DROP INDEX "horse_listings_price_amount_idx";

-- DropIndex
DROP INDEX "view_logs_created_at_idx";

-- AlterTable
ALTER TABLE "audit_logs" DROP COLUMN "ip_hash";

-- AlterTable
ALTER TABLE "horse_listings" DROP COLUMN "birth_year",
DROP COLUMN "height",
DROP COLUMN "phone_visible",
DROP COLUMN "weight";

-- AlterTable
ALTER TABLE "horse_media" DROP COLUMN "hash";

-- AlterTable
ALTER TABLE "view_logs" DROP COLUMN "ip_hash",
DROP COLUMN "user_agent_hash";

-- DropTable
DROP TABLE "banners";

-- DropTable
DROP TABLE "blog_categories";

-- DropTable
DROP TABLE "blog_post_tags";

-- DropTable
DROP TABLE "blog_posts";

-- DropTable
DROP TABLE "blog_tags";

-- DropTable
DROP TABLE "kopkari_events";

-- DropTable
DROP TABLE "product_categories";

-- DropTable
DROP TABLE "product_media";

-- DropTable
DROP TABLE "products";

-- DropTable
DROP TABLE "report_complaints";

-- DropEnum
DROP TYPE "BannerPlacement";

-- DropEnum
DROP TYPE "BannerStatus";

-- DropEnum
DROP TYPE "BlogStatus";

-- DropEnum
DROP TYPE "EventStatus";

-- DropEnum
DROP TYPE "ProductStatus";

-- DropEnum
DROP TYPE "ReportReason";

-- DropEnum
DROP TYPE "ReportStatus";

-- DropEnum
DROP TYPE "ReportTargetType";

-- DropEnum
DROP TYPE "StockStatus";
