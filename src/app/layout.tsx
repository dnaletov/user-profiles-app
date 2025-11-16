import "./globals.css";
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
        {children}
      </body>
    </html>
  );
}
