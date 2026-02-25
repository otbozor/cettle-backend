-- AlterTable
ALTER TABLE "products" ADD COLUMN     "district_id" TEXT,
ADD COLUMN     "favorite_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "region_id" TEXT;

-- CreateTable
CREATE TABLE "product_favorites" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_favorites_user_id_idx" ON "product_favorites"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_favorites_user_id_product_id_key" ON "product_favorites"("user_id", "product_id");

-- CreateIndex
CREATE INDEX "products_region_id_idx" ON "products"("region_id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "districts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_favorites" ADD CONSTRAINT "product_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_favorites" ADD CONSTRAINT "product_favorites_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
