"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface TabType {
  label: string;
  value: string;
}

interface UseTabNavigationProps {
  tabs: TabType[];
  defaultTab?: string;
  queryKey?: string; // query 모드에서 사용되는 쿼리 키
  mode?: "query" | "path" | "state"; // ✅ 동작 방식 선택
  syncParams?: string[]; // query 모드에서 유지할 파라미터 목록
  onTabChange?: (tab: string) => void;
}

/**
 * 탭 네비게이션 훅 (query, path, state 모드 지원)
 */
export const useTabNavigation = ({
  tabs,
  defaultTab = tabs[0]?.value,
  queryKey = "tab",
  mode = "path",
  syncParams = [],
  onTabChange,
}: UseTabNavigationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    let currentTab: string;

    if (mode === "query") {
      currentTab = searchParams.get(queryKey) ?? defaultTab;
    } else if (mode === "path") {
      currentTab =
        tabs.find((tab) => pathname.startsWith(tab.value))?.value ?? defaultTab;
    } else {
      // state 모드
      currentTab = activeTab;
    }

    setActiveTab(currentTab);
    onTabChange?.(currentTab);
  }, [searchParams, pathname, defaultTab, queryKey, tabs, mode]);

  const handleTabClick = (tab: string) => {
    if (activeTab === tab) return;

    if (mode === "query") {
      const params = new URLSearchParams(searchParams);
      params.set(queryKey, tab);

      syncParams.forEach((key) => {
        const value = searchParams.get(key);
        if (value) params.set(key, value);
      });

      router.push(`?${params.toString()}`);
    } else if (mode === "path") {
      router.push(tab);
    } else {
      // state 모드
      setActiveTab(tab);
      onTabChange?.(tab);
    }
  };

  return { activeTab, handleTabClick };
};
