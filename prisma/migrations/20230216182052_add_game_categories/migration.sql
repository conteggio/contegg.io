-- AlterTable
ALTER TABLE "Game" ADD COLUMN "bggThumbnail" TEXT;

-- CreateTable
CREATE TABLE "GameCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GameToGameCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GameToGameCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameToGameCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "GameCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "GameCategory_name_key" ON "GameCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_GameToGameCategory_AB_unique" ON "_GameToGameCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToGameCategory_B_index" ON "_GameToGameCategory"("B");
