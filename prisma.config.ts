import { existsSync } from "node:fs";
import { defineConfig } from "prisma/config";

// Prisma 7 .env'i kendiliğinden okumaz; Node'un yerleşik yükleyicisi dotenv'i gereksiz kılar.
// Üretimde .env yok, değişkenler ortamdan gelir.
if (existsSync(".env")) process.loadEnvFile();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
