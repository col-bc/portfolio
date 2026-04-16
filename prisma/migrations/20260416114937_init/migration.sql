-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lead" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "preferredContactMethod" TEXT NOT NULL,
    "organization" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "ipAddress" TEXT,
    "country" TEXT,
    "region" TEXT,
    "city" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "viewed" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Lead" ("createdAt", "email", "id", "message", "name", "organization", "phone", "preferredContactMethod", "subject", "viewed") SELECT "createdAt", "email", "id", "message", "name", "organization", "phone", "preferredContactMethod", "subject", "viewed" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
