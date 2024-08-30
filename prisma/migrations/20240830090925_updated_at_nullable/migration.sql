-- AlterTable
ALTER TABLE `Comment` MODIFY `updatedAt` DATETIME(3) NULL,
    MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Post` MODIFY `updatedAt` DATETIME(3) NULL,
    MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `updatedAt` DATETIME(3) NULL,
    MODIFY `deletedAt` DATETIME(3) NULL;
