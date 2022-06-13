/*
  Warnings:

  - Added the required column `url` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Made the column `duration` on table `Song` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Playlist_name_key";

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "name" TEXT,
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "duration" SET NOT NULL;
