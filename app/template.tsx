import { PageTransition } from "@/components";

// layout değil template: layout navigasyonda remount olmadığı için
// giriş animasyonu yalnızca ilk yüklemede tetiklenirdi.
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
