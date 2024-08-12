/*
  Warnings:

  - You are about to drop the column `clientCity` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `clientContacts` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `clientName` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `serviceName` on the `orders` table. All the data in the column will be lost.
  - Added the required column `serviceTitle` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contacts` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "clientCity",
DROP COLUMN "clientContacts",
DROP COLUMN "clientName",
DROP COLUMN "serviceName",
ADD COLUMN     "serviceTitle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "contacts" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
