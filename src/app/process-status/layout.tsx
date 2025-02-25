"use client";

import Tab from "@/components/ui/Tab";
import { useTabNavigation } from "@/hooks/useTabNavigation";

const tabs = [
  { label: "Parse", value: "/process-status/parse" },
  { label: "Prediction", value: "/process-status/prediction" },
];

export default function ProcessStatusLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { activeTab, handleTabClick } = useTabNavigation({
    tabs,
    mode: "path",
  });

  return (
    <>
      <Tab
        tabs={tabs}
        typographyProps={{ variant: "h1" }}
        activeTab={activeTab}
        onChange={handleTabClick}
        className="mb-6"
        showIndicator={false}
      />
      {children}
    </>
  );
}
