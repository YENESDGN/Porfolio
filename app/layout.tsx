import type { Metadata } from "next";
import { IBM_Plex_Serif } from "next/font/google";
import { Navbar } from "@/components";
import { site } from "@/config";
import "./globals.css";

// latin-ext olmadan ş/ğ/ı/İ karakterleri yedek fonta düşer.
const plexSerif = IBM_Plex_Serif({
  variable: "--font-plex-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["100", "300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${plexSerif.variable} h-full antialiased`}>
      {/* Sayfa ölçüsü tek yerde: navbar ve tüm sayfalar aynı kenardan hizalanır. */}
      <body className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-6">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
