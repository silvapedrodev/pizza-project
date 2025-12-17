/*
  Warnings:

  - You are about to drop the column `updateAt` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);
