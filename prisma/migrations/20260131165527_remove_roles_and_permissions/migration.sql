/*
  Warnings:

  - You are about to drop the `admin_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admin_user_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role_permissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "admin_user_roles" DROP CONSTRAINT "admin_user_roles_role_id_fkey";

-- DropForeignKey
ALTER TABLE "admin_user_roles" DROP CONSTRAINT "admin_user_roles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_role_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_admin" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "admin_roles";

-- DropTable
DROP TABLE "admin_user_roles";

-- DropTable
DROP TABLE "permissions";

-- DropTable
DROP TABLE "role_permissions";
