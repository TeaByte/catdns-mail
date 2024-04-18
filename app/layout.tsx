import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import Footer from "@/components/footer";
import "./globals.css";

const font = Rubik({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "CatDNS Mail",
  description: "CatDNS Mail",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
