/*
  Warnings:

  - A unique constraint covering the columns `[companyEmailId,companyEmailDomain]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_companyEmailId_key` ON `User`;

-- CreateIndex
CREATE UNIQUE INDEX `User_companyEmailId_companyEmailDomain_key` ON `User`(`companyEmailId`, `companyEmailDomain`);
