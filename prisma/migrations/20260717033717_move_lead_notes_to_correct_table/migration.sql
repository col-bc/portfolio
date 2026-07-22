/*
  Warnings:

  - You are about to drop the column `notes` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lead" ADD COLUMN "notes" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "imageAlt" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Job" ("company", "createdAt", "description", "endDate", "id", "imageAlt", "imageUrl", "isCurrent", "location", "skills", "startDate", "title", "updatedAt", "visible") SELECT "company", "createdAt", "description", "endDate", "id", "imageAlt", "imageUrl", "isCurrent", "location", "skills", "startDate", "title", "updatedAt", "visible" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
