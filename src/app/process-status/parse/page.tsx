"use client";

import { DatePicker, formatDate } from "@/components/date-picker";
import Tab from "@/components/ui/Tab";
import { useRouter, useSearchParams } from "next/navigation";
import ParseLogTable from "@/components/domain/ParseLogTable";
import useSWR from "swr";
import { IParseLog } from "@/types/table";
import Card from "@/components/ui/Card";
import { useState } from "react";

const tabs = [
  { label: "Log", value: "log" },
  { label: "Data", value: "data" },
];

export default function ParseStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultDate = searchParams.get("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    (defaultDate && new Date(defaultDate)) || new Date()
  );
  const activeTab = searchParams.get("tab") || "log";

  const handleTabClick = (tab: string) => {
    router.push(`?tab=${tab}`);
  };

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      router.push(`?tab=${activeTab}&date=${formatDate(date)}`);
      setSelectedDate(date);
    }
  };

  const { data: logs } = useSWR<IParseLog[]>(
    "http://localhost:3000/api/mock/parse-log"
  );

  const displayDate = {
    doubleCalendar: true,
    displayDateGroups: [
      {
        type: "success",
        dates: [new Date(2025, 1, 15), new Date(2025, 1, 20)],
        color: "#a6fc35",
      },
      {
        type: "failure",
        dates: [new Date(2025, 1, 18), new Date(2025, 1, 22)],
        color: "#F6465D",
      },
    ],
  };

  return (
    <>
      <div className="mb-6">
        <DatePicker
          selectedDate={selectedDate}
          onChange={handleDateSelect}
          {...displayDate}
        />
      </div>

      <div className="w-full border-b-[0.5px] border-outline1 h-fit pb-[6px] mb-4">
        <Tab
          activeTab={activeTab}
          onChange={handleTabClick}
          typographyProps={{ variant: "h4" }}
          tabs={tabs}
        />
      </div>

      {logs && activeTab === "log" && (
        <Card
          className="!w-full overflow-hidden"
          variant="bordered"
          padding="none"
        >
          <ParseLogTable data={logs} />
        </Card>
      )}
    </>
  );
}
