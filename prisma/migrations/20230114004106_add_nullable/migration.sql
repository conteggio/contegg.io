-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlayerPlay" (
    "playerId" INTEGER NOT NULL,
    "playId" INTEGER NOT NULL,
    "score" REAL,

    PRIMARY KEY ("playerId", "playId"),
    CONSTRAINT "PlayerPlay_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerPlay_playId_fkey" FOREIGN KEY ("playId") REFERENCES "Play" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlayerPlay" ("playId", "playerId", "score") SELECT "playId", "playerId", "score" FROM "PlayerPlay";
DROP TABLE "PlayerPlay";
ALTER TABLE "new_PlayerPlay" RENAME TO "PlayerPlay";
CREATE TABLE "new_Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playId" INTEGER NOT NULL,
    "startedAt" DATETIME,
    "finishedAt" DATETIME,
    CONSTRAINT "Session_playId_fkey" FOREIGN KEY ("playId") REFERENCES "Play" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("finishedAt", "id", "playId", "startedAt") SELECT "finishedAt", "id", "playId", "startedAt" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
