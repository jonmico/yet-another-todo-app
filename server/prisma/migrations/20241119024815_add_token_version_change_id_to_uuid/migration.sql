/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    ADD COLUMN `refreshTokenVersion` INTEGER NOT NULL DEFAULT 0,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
