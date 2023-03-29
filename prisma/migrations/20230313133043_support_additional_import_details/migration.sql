/*
  Warnings:

  - Added the required column `updatedAt` to the `GameCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN "importedFrom" TEXT;
ALTER TABLE "Game" ADD COLUMN "importedId" INTEGER;
ALTER TABLE "Game" ADD COLUMN "importedUuid" TEXT;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN "importedFrom" TEXT;
ALTER TABLE "Location" ADD COLUMN "importedId" INTEGER;
ALTER TABLE "Location" ADD COLUMN "importedUuid" TEXT;

-- AlterTable
ALTER TABLE "Play" ADD COLUMN "importedFrom" TEXT;
ALTER TABLE "Play" ADD COLUMN "importedId" INTEGER;
ALTER TABLE "Play" ADD COLUMN "importedUuid" TEXT;

-- AlterTable
ALTER TABLE "Player" ADD COLUMN "importedFrom" TEXT;
ALTER TABLE "Player" ADD COLUMN "importedId" INTEGER;
ALTER TABLE "Player" ADD COLUMN "importedUuid" TEXT;

-- AlterTable
ALTER TABLE "PlayerPlay" ADD COLUMN "importedFrom" TEXT;
ALTER TABLE "PlayerPlay" ADD COLUMN "importedId" INTEGER;
ALTER TABLE "PlayerPlay" ADD COLUMN "importedUuid" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GameCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_GameCategory" ("id", "name") SELECT "id", "name" FROM "GameCategory";
DROP TABLE "GameCategory";
ALTER TABLE "new_GameCategory" RENAME TO "GameCategory";
CREATE UNIQUE INDEX "GameCategory_name_key" ON "GameCategory"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
