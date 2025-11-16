import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">{children}</main>
      <Footer />
    </>
  );
}
