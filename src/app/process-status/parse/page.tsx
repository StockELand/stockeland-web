"use client";

import {
  DatePicker,
  DisplayDateGroup,
  formatDate,
} from "@/components/date-picker";
import Tab from "@/components/ui/Tab";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "@/components/ui/Card";
import { useEffect, useState } from "react";
import useProcessStatus from "@/hooks/useProcessStatus";
import { IParseLog } from "@/types/table";
import ParseDataTable from "@/components/domain/table/ParseDataTable";
import ParseLogTable from "@/components/domain/table/ParseLogTable";

const statusProcessing = (
  data: { [key: string]: DisplayDateGroup } | undefined
): { [key: string]: DisplayDateGroup } | undefined => {
  if (!data) return;
  data["success"]["color"] = "#a6fc35";
  data["fail"]["color"] = "#F6465D";
  return data;
};

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

  const { data, logs, status, setDateRange } = useProcessStatus<IParseLog>({
    uri: "parse",
    selectedDate,
  });

  const handleTabClick = (tab: string) => {
    router.push(
      `?tab=${tab}${selectedDate && `&date=${formatDate(selectedDate)}`}`
    );
  };

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      router.push(`?tab=${activeTab}&date=${formatDate(date)}`);
      setSelectedDate(date);
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
          displayDateGroups={statusProcessing(status)}
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
