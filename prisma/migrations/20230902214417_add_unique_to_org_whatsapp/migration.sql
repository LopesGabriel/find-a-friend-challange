/*
  Warnings:

  - A unique constraint covering the columns `[whatsapp]` on the table `Org` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Org_whatsapp_key" ON "Org"("whatsapp");
