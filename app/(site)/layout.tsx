import { getContent } from "@/lib/content-store";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/common/FloatingActions";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { site, services } = await getContent();

  return (
    <>
      <Header site={site} />
      <main className="flex-1">{children}</main>
      <Footer site={site} services={services} />
      <FloatingActions site={site} />
    </>
  );
}
