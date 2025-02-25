"use client";

import {
  DatePicker,
  DisplayDateGroup,
  formatDate,
  useDatePickerState,
} from "@/components/date-picker";
import Tab from "@/components/ui/Tab";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "@/components/ui/Card";
import { useEffect } from "react";
import Input from "@/components/ui/Input";
import CalendarIcon from "@/../public/assets/calendar.svg";
import PredictionProcessButton from "@/components/domain/PredictionProcessButton";
import PredictionLogTable from "@/components/domain/table/PredictionLogTable";
import PredictionDataTable from "@/components/domain/table/PredictionDataTable";
import { usePredictProcessStatus } from "@/hooks/useProcessStatus";

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

  const {
    inputValue,
    handleDateChange,
    handleInputChange,
    selectedDate,
    setSelectedDate,
  } = useDatePickerState((defaultDate && new Date(defaultDate)) || new Date());

  const activeTab = searchParams.get("tab") || "log";

  const { data, logs, status, setDateRange } =
    usePredictProcessStatus(selectedDate);

  const handleTabClick = (tab: string) => {
    router.push(
      `?tab=${tab}${selectedDate && `&date=${formatDate(selectedDate)}`}`
    );
  };

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      router.push(`?tab=${activeTab}&date=${formatDate(date)}`);
    }
  };

  useEffect(() => {
    const date = searchParams.get("date");
    if (date) {
      setSelectedDate(new Date(date));
    } else {
      setSelectedDate(new Date());
    }
  }, [searchParams, setSelectedDate]);

  return (
    <>
      <div className="mb-6 flex flex-row gap-4">
        <DatePicker
          selectedDate={selectedDate}
          onChange={(date) => {
            handleDateChange(date);
            handleDateSelect(date);
          }}
          displayDateGroups={statusProcessing(status)}
          onDateRangeChange={setDateRange}
          // doubleCalendar
          customInput={
            <Input
              rightIcon={<CalendarIcon className="size-5" />}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="YYYY-MM-DD"
            />
          }
        />
        <PredictionProcessButton date={formatDate(selectedDate)} />
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
          <PredictionLogTable data={logs} />
        </Card>
      )}
      {data && data?.length !== 0 && activeTab === "data" && (
        <Card
          className="!w-full overflow-hidden"
          variant="bordered"
          padding="none"
        >
          <PredictionDataTable data={data} />
        </Card>
      )}
    </>
  );
}
