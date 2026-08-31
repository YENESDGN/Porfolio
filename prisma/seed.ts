import { prisma } from "@/lib/prisma";

// Seed idempotent olmalı: her kayıt upsert ile yazılır ki
// iki kez çalıştırıldığında içerik ikizlenmesin.
async function main() {
  console.log("Seed: girilecek içerik henüz yok.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
