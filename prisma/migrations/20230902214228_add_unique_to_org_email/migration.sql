/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Org` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Org_email_key" ON "Org"("email");
