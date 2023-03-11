/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `description` on the `Game` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Session";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "playId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Role_playId_fkey" FOREIGN KEY ("playId") REFERENCES "Play" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Play" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "notes" TEXT NOT NULL DEFAULT '',
    "gameId" INTEGER NOT NULL,
    "locationId" INTEGER,
    "durationMinutes" INTEGER,
    "rounds" INTEGER,
    "ignore" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Play_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Play_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Play" ("createdAt", "gameId", "id", "updatedAt") SELECT "createdAt", "gameId", "id", "updatedAt" FROM "Play";
DROP TABLE "Play";
ALTER TABLE "new_Play" RENAME TO "Play";
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rating" REAL,
    "notes" TEXT NOT NULL DEFAULT '',
    "bggId" TEXT,
    "bggName" TEXT,
    "bggDescription" TEXT,
    "bggYear" INTEGER,
    "bggThumbnail" TEXT,
    "bggImage" TEXT,
    "minPlayerCount" INTEGER,
    "maxPlayerCount" INTEGER,
    "minPlayTime" INTEGER,
    "maxPlayTime" INTEGER,
    "minAge" INTEGER,
    "ruleHasNoPoints" BOOLEAN NOT NULL DEFAULT false,
    "ruleHighestWins" BOOLEAN NOT NULL DEFAULT true,
    "ruleIsCooperative" BOOLEAN NOT NULL DEFAULT false,
    "ruleDefaultToTeams" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Game" ("bggId", "bggThumbnail", "createdAt", "id", "name", "updatedAt") SELECT "bggId", "bggThumbnail", "createdAt", "id", "name", "updatedAt" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "bggUsername" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Player" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE TABLE "new_PlayerPlay" (
    "playerId" INTEGER NOT NULL,
    "playId" INTEGER NOT NULL,
    "roleId" INTEGER,
    "score" REAL,
    "isWinner" BOOLEAN NOT NULL DEFAULT false,
    "isNewPlayer" BOOLEAN NOT NULL DEFAULT false,
    "isStartPlayer" BOOLEAN NOT NULL DEFAULT false,
    "rank" INTEGER NOT NULL DEFAULT 0,
    "seatOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("playerId", "playId"),
    CONSTRAINT "PlayerPlay_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerPlay_playId_fkey" FOREIGN KEY ("playId") REFERENCES "Play" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PlayerPlay_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PlayerPlay" ("createdAt", "playId", "playerId", "score", "updatedAt") SELECT "createdAt", "playId", "playerId", "score", "updatedAt" FROM "PlayerPlay";
DROP TABLE "PlayerPlay";
ALTER TABLE "new_PlayerPlay" RENAME TO "PlayerPlay";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Role_playId_name_key" ON "Role"("playId", "name");
