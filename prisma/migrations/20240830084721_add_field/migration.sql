/*
  Warnings:

  - You are about to drop the column `companyEmail` on the `User` table. All the data in the column will be lost.
  - Added the required column `companyEmailDomain` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyEmailId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `companyEmail`,
    ADD COLUMN `companyEmailDomain` VARCHAR(191) NOT NULL,
    ADD COLUMN `companyEmailId` VARCHAR(191) NOT NULL;
