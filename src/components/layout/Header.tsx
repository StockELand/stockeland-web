import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center w-full h-16 px-6 bg-background">
      <div className="flex items-center px-3">
        <Link href="/">
          <span className="text-lg font-bold text-signature">StockELand</span>
        </Link>
      </div>
      <nav className="flex items-center">
        <Link href="/">
          <span className="px-3 text-sm font-bold cursor-pointer">
            대시보드
          </span>
        </Link>
        <Link href="/process-status/parse">
          <span className="px-3 text-sm font-bold cursor-pointer">
            작업 상태
          </span>
        </Link>
        <span className="px-3 text-sm font-bold cursor-pointer">설정</span>
      </nav>
    </header>
  );
}
