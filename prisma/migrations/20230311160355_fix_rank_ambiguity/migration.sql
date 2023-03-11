/*
  Warnings:

  - You are about to drop the column `rank` on the `PlayerPlay` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlayerPlay" (
    "playerId" INTEGER NOT NULL,
    "playId" INTEGER NOT NULL,
    "roleId" INTEGER,
    "score" REAL,
    "isWinner" BOOLEAN NOT NULL DEFAULT false,
    "isNewPlayer" BOOLEAN NOT NULL DEFAULT false,
    "isStartPlayer" BOOLEAN NOT NULL DEFAULT false,
    "seatOrder" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("playerId", "playId"),
    CONSTRAINT "PlayerPlay_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerPlay_playId_fkey" FOREIGN KEY ("playId") REFERENCES "Play" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PlayerPlay_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PlayerPlay" ("createdAt", "isNewPlayer", "isStartPlayer", "isWinner", "playId", "playerId", "roleId", "score", "seatOrder", "updatedAt") SELECT "createdAt", "isNewPlayer", "isStartPlayer", "isWinner", "playId", "playerId", "roleId", "score", "seatOrder", "updatedAt" FROM "PlayerPlay";
DROP TABLE "PlayerPlay";
ALTER TABLE "new_PlayerPlay" RENAME TO "PlayerPlay";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
