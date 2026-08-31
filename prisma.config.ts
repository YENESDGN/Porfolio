import { defineConfig } from "prisma/config";

// Prisma 7 .env'i kendiliğinden okumaz; Node'un yerleşik yükleyicisi dotenv bağımlılığını gereksiz kılar.
try {
  process.loadEnvFile();
} catch {
  // .env yoksa değişkenler ortamdan gelir — üretimde durum budur.
}

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
