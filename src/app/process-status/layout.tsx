"use client";

import Tab from "@/components/ui/Tab";
import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { label: "Parse", value: "/process-status/parse" },
  { label: "Prediction", value: "/process-status/prediction" },
];

export default function ProcessStatusLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  const handleTabClick = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <Tab
        tabs={tabs}
        typographyProps={{ variant: "h1" }}
        activeTab={pathname}
        onChange={handleTabClick}
        className="mb-6"
        showIndicator={false}
      />
      {children}
    </>
  );
}
