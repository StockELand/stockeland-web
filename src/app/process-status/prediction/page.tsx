"use client";

import { DatePicker, useDatePickerState } from "@/components/date-picker";
import Tab from "@/components/ui/Tab";
import { useSearchParams } from "next/navigation";
import Card from "@/components/ui/Card";
import { useEffect } from "react";
import Input from "@/components/ui/Input";
import CalendarIcon from "@/../public/assets/calendar.svg";
import PredictionProcessButton from "@/components/domain/PredictionProcessButton";
import PredictionLogTable from "@/components/domain/table/PredictionLogTable";
import PredictionDataTable from "@/components/domain/table/PredictionDataTable";
import { usePredictProcessStatus } from "@/hooks/useProcessStatus";
import { useTabNavigation } from "@/hooks/useTabNavigation";

const tabs = [
  { label: "Log", value: "log" },
  { label: "Data", value: "data" },
];

export default function ParseStatus() {
  const searchParams = useSearchParams();

  const defaultDate = searchParams.get("date");
  const { inputValue, handleDateChange, handleInputChange, selectedDate } =
    useDatePickerState((defaultDate && new Date(defaultDate)) || new Date());

  const { data, logs, status, setDateRange } =
    usePredictProcessStatus(selectedDate);

  const { activeTab, handleTabClick } = useTabNavigation({
    tabs,
    mode: "query",
    syncParams: ["date"],
  });

  useEffect(() => {
    handleDateChange(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    const date = searchParams.get("date");
    if (date) {
      handleDateChange(new Date(date));
    } else {
      handleDateChange(new Date());
    }
  }, [searchParams]);

  return (
    <>
      <div className="mb-6 flex flex-row gap-4">
        <DatePicker
          selectedDate={selectedDate}
          onChange={handleDateChange}
          displayDateGroups={status}
          onMonthRangeChange={setDateRange}
          customInput={
            <Input
              rightIcon={<CalendarIcon className="size-5" />}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="YYYY-MM-DD"
            />
          }
        />
        <PredictionProcessButton date={selectedDate} />
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
