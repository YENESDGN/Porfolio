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
      <body className="flex min-h-full flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
