/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_id_userId_key" ON "Portfolio"("id", "userId");
