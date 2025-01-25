import type { Metadata } from "next";
import StyledComponentsRegistry from "../lib/registry";

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
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
