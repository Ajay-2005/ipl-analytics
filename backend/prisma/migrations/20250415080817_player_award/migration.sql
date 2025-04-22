/*
  Warnings:

  - Added the required column `season` to the `PlayerAward` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlayerAward" ADD COLUMN     "season" INTEGER NOT NULL;
