-- CreateEnum
CREATE TYPE "CattlePurpose" AS ENUM ('GOSHT', 'SUT', 'NASLCHILIK', 'ISHCHI', 'OMIXTA');

-- CreateEnum
CREATE TYPE "CattleGender" AS ENUM ('HOKIZ', 'SIGIR');

-- CreateEnum
CREATE TYPE "SheepType" AS ENUM ('QOY', 'ECHKI');

-- CreateEnum
CREATE TYPE "SheepPurpose" AS ENUM ('GOSHT', 'JUN', 'SUT', 'NASLCHILIK', 'OMIXTA');

-- CreateEnum
CREATE TYPE "SheepGender" AS ENUM ('URGOCHI', 'ERKAK');

-- CreateTable
CREATE TABLE "cattle_listings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "region_id" TEXT NOT NULL,
    "district_id" TEXT,
    "purpose" "CattlePurpose",
    "gender" "CattleGender",
    "breed_id" TEXT,
    "age_years" INTEGER,
    "color" TEXT,
    "price_amount" DECIMAL(15,2) NOT NULL,
    "price_currency" "Currency" NOT NULL DEFAULT 'UZS',
    "has_passport" BOOLEAN NOT NULL DEFAULT false,
    "has_vaccine" BOOLEAN,
    "has_video" BOOLEAN NOT NULL DEFAULT false,
    "status" "ListingStatus" NOT NULL DEFAULT 'DRAFT',
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "is_top" BOOLEAN NOT NULL DEFAULT false,
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "reject_reason" TEXT,
    "sale_source" "SaleSource",
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "favorite_count" INTEGER NOT NULL DEFAULT 0,
    "published_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "boost_expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cattle_listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cattle_media" (
    "id" TEXT NOT NULL,
    "listing_id" TEXT NOT NULL,
    "type" "MediaType" NOT NULL DEFAULT 'IMAGE',
    "url" TEXT NOT NULL,
    "thumb_url" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cattle_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sheep_breeds" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "animal_type" TEXT NOT NULL DEFAULT 'QOY',

    CONSTRAINT "sheep_breeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sheep_listings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "animal_type" "SheepType" NOT NULL DEFAULT 'QOY',
    "region_id" TEXT NOT NULL,
    "district_id" TEXT,
    "purpose" "SheepPurpose",
    "gender" "SheepGender",
    "breed_id" TEXT,
    "age_months" INTEGER,
    "price_amount" DECIMAL(15,2) NOT NULL,
    "price_currency" "Currency" NOT NULL DEFAULT 'UZS',
    "has_vaccine" BOOLEAN,
    "has_video" BOOLEAN NOT NULL DEFAULT false,
    "status" "ListingStatus" NOT NULL DEFAULT 'DRAFT',
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "is_top" BOOLEAN NOT NULL DEFAULT false,
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "reject_reason" TEXT,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "favorite_count" INTEGER NOT NULL DEFAULT 0,
    "published_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sheep_listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sheep_media" (
    "id" TEXT NOT NULL,
    "listing_id" TEXT NOT NULL,
    "type" "MediaType" NOT NULL DEFAULT 'IMAGE',
    "url" TEXT NOT NULL,
    "thumb_url" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sheep_media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cattle_listings_slug_key" ON "cattle_listings"("slug");
CREATE INDEX "cattle_listings_user_id_idx" ON "cattle_listings"("user_id");
CREATE INDEX "cattle_listings_region_id_idx" ON "cattle_listings"("region_id");
CREATE INDEX "cattle_listings_status_idx" ON "cattle_listings"("status");
CREATE INDEX "cattle_listings_published_at_idx" ON "cattle_listings"("published_at");

CREATE INDEX "cattle_media_listing_id_idx" ON "cattle_media"("listing_id");

CREATE UNIQUE INDEX "sheep_breeds_name_key" ON "sheep_breeds"("name");
CREATE UNIQUE INDEX "sheep_breeds_slug_key" ON "sheep_breeds"("slug");

CREATE UNIQUE INDEX "sheep_listings_slug_key" ON "sheep_listings"("slug");
CREATE INDEX "sheep_listings_user_id_idx" ON "sheep_listings"("user_id");
CREATE INDEX "sheep_listings_region_id_idx" ON "sheep_listings"("region_id");
CREATE INDEX "sheep_listings_status_idx" ON "sheep_listings"("status");
CREATE INDEX "sheep_listings_published_at_idx" ON "sheep_listings"("published_at");

CREATE INDEX "sheep_media_listing_id_idx" ON "sheep_media"("listing_id");

-- AddForeignKey
ALTER TABLE "cattle_listings" ADD CONSTRAINT "cattle_listings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "cattle_listings" ADD CONSTRAINT "cattle_listings_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cattle_listings" ADD CONSTRAINT "cattle_listings_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "districts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "cattle_listings" ADD CONSTRAINT "cattle_listings_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "breeds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "cattle_media" ADD CONSTRAINT "cattle_media_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "cattle_listings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "sheep_listings" ADD CONSTRAINT "sheep_listings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "sheep_listings" ADD CONSTRAINT "sheep_listings_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "sheep_listings" ADD CONSTRAINT "sheep_listings_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "districts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "sheep_listings" ADD CONSTRAINT "sheep_listings_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "sheep_breeds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "sheep_media" ADD CONSTRAINT "sheep_media_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "sheep_listings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
