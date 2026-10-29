import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";

function isAuthorized(header: string | null, secret: string): boolean {
  const given = Buffer.from(header ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

// İçerik ayda bir değişiyor ve sayfa sayısı az: tek çağrı tüm ağacı tazeler.
// Okuma için API yok; bu uç yalnızca seed/Studio sonrası elle tetiklenir.
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { error: "REVALIDATE_SECRET tanımlı değil" },
      { status: 500 },
    );
  }
  if (!isAuthorized(request.headers.get("authorization"), secret)) {
    return Response.json({ error: "Yetkisiz" }, { status: 401 });
  }

  revalidatePath("/", "layout");
  return Response.json({ revalidated: true });
}
