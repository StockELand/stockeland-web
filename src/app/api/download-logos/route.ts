import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const LOGO_DIR = path.join(process.cwd(), "public", "logos");
const SYMBOLS_API = "http://localhost:8080/stock/symbols"; // 심볼 리스트 API

export async function GET() {
  try {
    // 심볼 리스트 가져오기
    const symbolsResponse = await fetch(SYMBOLS_API);
    if (!symbolsResponse.ok) {
      throw new Error(`Failed to fetch symbols: ${symbolsResponse.statusText}`);
    }

    const STOCK_SYMBOLS: string[] = await symbolsResponse.json();

    if (!Array.isArray(STOCK_SYMBOLS) || STOCK_SYMBOLS.length === 0) {
      throw new Error("No stock symbols received");
    }

    // 로고 저장 폴더 생성
    if (!fs.existsSync(LOGO_DIR)) {
      fs.mkdirSync(LOGO_DIR, { recursive: true });
    }

    for (const symbol of STOCK_SYMBOLS) {
      const url = `https://storage.googleapis.com/iex/api/logos/${symbol}.png`;

      const response = await fetch(url);
      if (!response.ok) {
        console.warn(
          `⚠️ Failed to fetch ${symbol} logo: ${response.statusText}`
        );
        continue;
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      const filePath = path.join(LOGO_DIR, `${symbol}.png`);
      fs.writeFileSync(filePath, buffer);
      console.log(`✅ Saved: ${symbol}.png`);
    }
    return NextResponse.json("");
  } catch (error) {
    console.error("❌ Error downloading stock logos", error);
  }
}
