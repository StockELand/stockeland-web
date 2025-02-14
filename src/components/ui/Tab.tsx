import React, { useState } from "react";
import clsx from "clsx";
import Typography, { TypographyProps } from "./Typography";

interface TabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface TabProps {
  tabs: TabItem[];
  activeTab?: string | null;
  onChange?: (value: string) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  showIndicator?: boolean; // 인디케이터 표시 여부
  typographyProps?: TypographyProps; // Typography의 모든 props 지원
}

export default function Tab({
  tabs,
  activeTab: controlledActiveTab,
  onChange,
  className = "",
  tabClassName = "",
  activeTabClassName = "",
  showIndicator = true, // 기본값: 인디케이터 표시
  typographyProps = {},
}: TabProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.value);

  // Controlled 방식이 아니라면 내부 상태 사용
  const activeTab = controlledActiveTab ?? internalActiveTab;

  const handleTabClick = (value: string) => {
    if (!controlledActiveTab) setInternalActiveTab(value);
    onChange?.(value);
  };

  return (
    <div
      className={clsx("relative w-fit flex cursor-pointer gap-4", className)}
    >
      {tabs.map((tab) => (
        <Typography
          key={tab.value}
          className={clsx(
            "text-thTxt transition hover:opacity-30 relative",
            tabClassName,
            activeTab === tab.value &&
              clsx("!text-foreground", activeTabClassName)
          )}
          isMargin={false}
          onClick={() => handleTabClick(tab.value)}
          {...typographyProps} // Typography의 모든 props 전달
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
          {showIndicator && activeTab === tab.value && (
            <div className="absolute -bottom-2 w-10/12 translate-x-1/2 right-1/2 h-1 bg-signature" />
          )}
        </Typography>
      ))}
    </div>
  );
}
