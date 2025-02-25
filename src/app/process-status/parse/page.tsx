"use client";

import { DatePicker, useDatePickerState } from "@/components/date-picker";
import Tab from "@/components/ui/Tab";
import { useSearchParams } from "next/navigation";
import Card from "@/components/ui/Card";
import { useEffect } from "react";
import { useParseProcessStatus } from "@/hooks/useProcessStatus";
import ParseDataTable from "@/components/domain/table/ParseDataTable";
import ParseLogTable from "@/components/domain/table/ParseLogTable";
import { useTabNavigation } from "@/hooks/useTabNavigation";
import Input from "@/components/ui/Input";
import { useRangeDatePickerState } from "@/components/date-picker/hooks/useRangeDatePickerState";
import ParseProcessButton from "@/components/domain/ParseProcessButton";
import CalendarIcon from "@/../public/assets/calendar.svg";

const tabs = [
  { label: "Log", value: "log" },
  { label: "Data", value: "data" },
];

export default function ParseStatus() {
  const searchParams = useSearchParams();

  const defaultDate = searchParams.get("date");

  const { selectedDate, handleDateChange } = useDatePickerState(
    (defaultDate && new Date(defaultDate)) || new Date()
  );

  const { data, logs, status, setDateRange } =
    useParseProcessStatus(selectedDate);

  const { activeTab, handleTabClick } = useTabNavigation({
    tabs,
    mode: "query",
    syncParams: ["date"],
  });

  useEffect(() => {
    const date = searchParams.get("date");
    if (date) {
      handleDateChange(new Date(date));
    } else {
      handleDateChange(new Date());
    }
  }, [searchParams]);

  const { inputValue, handleInputChange, rangeDate, handleRangeChange } =
    useRangeDatePickerState();

  return (
    <>
      <div className="mb-6 flex flex-col gap-6">
        <DatePicker
          selectedDate={selectedDate}
          onChange={handleDateChange}
          onMonthRangeChange={setDateRange}
          displayDateGroups={status}
          doubleCalendar
        />

        <div className="flex flex-row gap-4">
          <DatePicker
            rangeDate={rangeDate}
            onRangeChange={handleRangeChange}
            enableRange
            customInput={
              <Input
                rightIcon={<CalendarIcon className="size-5" />}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="YYYY-MM-DD ~ YYYY-MM-DD"
                className="w-72"
                textAlign="center"
              />
            }
          />
          <ParseProcessButton {...rangeDate} />
        </div>
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
