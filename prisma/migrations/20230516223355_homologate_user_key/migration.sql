/*
  Warnings:

  - You are about to drop the column `authorId` on the `Canvas` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Canvas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Canvas" DROP CONSTRAINT "Canvas_authorId_fkey";

-- AlterTable
ALTER TABLE "Canvas" DROP COLUMN "authorId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Canvas" ADD CONSTRAINT "Canvas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
