import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import HeaderWrapper from "@/components/HeaderWrapper";
import FooterWrapper from "@/components/FooterWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ACES CARE HUB JAPAN",
  description: "Re-Verse Civilization",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-[#05070A] text-slate-200 antialiased`}>
        <Providers>
          <HeaderWrapper />
          <main className="min-h-screen">
            {children}
          </main>
          {/* 🚨 ここを FooterWrapper にすることで、/hais ではメインフッターが消えます */}
          <FooterWrapper />
        </Providers>
      </body>
    </html>
  );
}
