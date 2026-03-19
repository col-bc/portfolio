/**
 * @module prisma
 * @description This module initializes and exports a PrismaClient instance configured with the Better SQLite3 adapter.
 *
 */
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config";
import { PrismaClient } from "../../../prisma/generated/prisma/client";
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });
export { prisma };
