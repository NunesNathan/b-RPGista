/*
  Warnings:

  - You are about to alter the column `favorites` on the `users` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `favorites` JSON NOT NULL;
