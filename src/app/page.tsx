"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getStocks } from "@/utils/getStocks";
import { IStock } from "@/types/table";
import StockTable from "@/components/domain/StockTable";

export default function Home() {
  const [stocks, setStocks] = useState<IStock[]>([]);

  useEffect(() => {
    getStocks().then(setStocks).catch(console.error);
  }, []);

  return (
    <>
      {/* Header */}
      <header className="flex items-center w-full h-16 px-6 bg-gray-900">
        <div className="flex items-center px-3">
          <Link href="/">
            <span className="text-lg font-bold text-signature">StockELand</span>
          </Link>
        </div>
        <nav className="flex items-center">
          <span className="px-3 text-sm font-bold text-white cursor-pointer">
            Dashboard
          </span>
          <span className="px-3 text-sm font-bold text-white cursor-pointer">
            설정
          </span>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-8 py-6">
        <h1 className="mb-6 text-3xl font-bold text-white">Dashboard</h1>

        <div className="flex flex-wrap gap-6 mb-6">
          {/* Manual Run Card */}
          <div className="flex flex-col w-80 p-6 space-y-4 bg-gray-800 rounded-2xl h-fit">
            <h2 className="text-m font-bold text-white">수동 실행</h2>
            <div className="flex flex-col space-y-2">
              <button className="h-12 text-sm font-bold bg-signature2 rounded-md text-gray-900">
                Data Parsing
              </button>
              <button className="h-12 text-sm font-bold bg-signature2 rounded-md text-gray-900">
                Model Learning
              </button>
            </div>
          </div>

          {/* Top 5 Card */}
          <div className="flex flex-col w-80 p-6 space-y-4 border-outline1 border-[1px] rounded-2xl h-fit">
            <h2 className="text-m font-bold text-white">Top 5</h2>
            <div className="flex flex-col space-y-3">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-2 py-1"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-white rounded-full">
                      <Image
                        src="/tesla-logo.png"
                        alt="Tesla Logo"
                        width={24}
                        height={24}
                      />
                    </div>
                    <span className="text-sm font-bold text-white">TSLA</span>
                  </div>
                  <span className="text-sm font-bold text-signature">
                    23.19%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom 5 Card */}
          <div className="flex flex-col w-80 p-6 space-y-4 border-outline1 border-[1px] rounded-2xl h-fit">
            <h2 className="text-m font-bold text-white">Bottom 5</h2>
            <div className="flex flex-col space-y-3">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-2 py-1"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-white rounded-full">
                      <Image
                        src="/tesla-logo.png"
                        alt="Tesla Logo"
                        width={24}
                        height={24}
                      />
                    </div>
                    <span className="text-sm font-bold text-white">TSLA</span>
                  </div>
                  <span className="text-sm font-bold text-fall">-12.45%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-outline1 border-[1px] rounded-2xl overflow-hidden">
          <StockTable data={stocks} />
        </div>
      </main>
    </>
  );
}
