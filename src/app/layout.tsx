import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Manager",
  description: "Manage your profiles easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto py-8 px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
