"use client";

import { DatePicker, formatDate } from "@/components/date-picker";
import Tab from "@/components/ui/Tab";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "@/components/ui/Card";
import { useEffect, useState } from "react";
import { useParseProcessStatus } from "@/hooks/useProcessStatus";
import ParseDataTable from "@/components/domain/table/ParseDataTable";
import ParseLogTable from "@/components/domain/table/ParseLogTable";
import { useTabNavigation } from "@/hooks/useTabNavigation";

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

  const { data, logs, status, setDateRange } =
    useParseProcessStatus(selectedDate);

  const { activeTab, handleTabClick } = useTabNavigation({
    tabs,
    mode: "query",
    syncParams: ["date"],
  });

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      const params = new URLSearchParams(searchParams);
      params.set("tab", activeTab);
      params.set("date", formatDate(date) || "");
      router.push(`?${params.toString()}`);
    }
  };
  useEffect(() => {
    const date = searchParams.get("date");
    if (date) {
      setSelectedDate(new Date(date));
    } else {
      setSelectedDate(new Date());
    }
  }, [searchParams]);

  return (
    <>
      <div className="mb-6">
        <DatePicker
          selectedDate={selectedDate}
          onChange={handleDateSelect}
          onDateRangeChange={setDateRange}
          displayDateGroups={status}
          doubleCalendar
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

      {logs && logs?.length !== 0 && activeTab === "log" && (
        <Card
          className="!w-full overflow-hidden"
          variant="bordered"
          padding="none"
        >
          <ParseLogTable data={logs} />
        </Card>
      )}
      {data && data?.length !== 0 && activeTab === "data" && (
        <Card
          className="!w-full overflow-hidden"
          variant="bordered"
          padding="none"
        >
          <ParseDataTable data={data} />
        </Card>
      )}
    </>
  );
}
