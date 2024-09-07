/*
  Warnings:

  - You are about to alter the column `deviceType` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - A unique constraint covering the columns `[companyEmailId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nickname]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `deviceType` ENUM('ios', 'android') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_companyEmailId_key` ON `User`(`companyEmailId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_nickname_key` ON `User`(`nickname`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_writerId_fkey` FOREIGN KEY (`writerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
