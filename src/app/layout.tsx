import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { SWRProvider } from "./swr-provider";

const notoSansKr = Noto_Sans_KR({
  variable: "--noto_sans_kr",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StockELand Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} font-sans`}>
        <SWRProvider>
          <Header />
          <main className="pt-6  max-w-[1200px] m-auto">{children}</main>
        </SWRProvider>
      </body>
    </html>
  );
}
