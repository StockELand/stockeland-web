"use client";

import Tab from "@/components/ui/Tab";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "@/components/ui/Card";
import { useCallback, useEffect, useMemo } from "react";
import { useParseProcessStatus } from "@/hooks/useProcessStatus";
import ParseDataTable from "@/components/domain/table/ParseDataTable";
import ParseLogTable from "@/components/domain/table/ParseLogTable";
import { useTabNavigation } from "@/hooks/useTabNavigation";
import Input from "@/components/ui/Input";
import ParseProcessButton from "@/components/domain/ParseProcessButton";
import CalendarIcon from "@/../public/assets/calendar.svg";
import {
  DatePicker,
  formatDate,
  useDatePickerState,
  useRangeDatePickerState,
} from "@l11040/eland-datepicker";

const tabs = [
  { label: "Log", value: "log" },
  { label: "Data", value: "data" },
];

export default function ParseStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultDate = useMemo(() => {
    const dateParam = searchParams?.get("date");
    return dateParam ? new Date(dateParam) : new Date();
  }, [searchParams]);

  const { selectedDate, handleDateChange } = useDatePickerState(defaultDate);

  const { data, logs, status, setDateRange } =
    useParseProcessStatus(selectedDate);

  const { activeTab, handleTabClick } = useTabNavigation({
    tabs,
    mode: "query",
    syncParams: ["date"],
  });

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const handleDateSelect = useCallback(
    (date: Date | null) => {
      if (!date) return;
      params.set("tab", activeTab);
      params.set("date", formatDate(date) || "");
      router.replace(`?${params.toString()}`);
    },
    [params, activeTab, router]
  );

  const updateDate = useCallback(() => {
    handleDateChange(defaultDate);
  }, [handleDateChange, defaultDate]);

  useEffect(() => {
    updateDate();
  }, [updateDate]);

  const { inputValue, handleInputChange, rangeDate, handleRangeChange } =
    useRangeDatePickerState();

  return (
    <>
      <div className="mb-6 flex flex-col gap-6">
        <DatePicker
          selectedDate={selectedDate}
          onChange={handleDateSelect}
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
                value={inputValue || ""}
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

      {logs && logs.length !== 0 && activeTab === "log" && (
        <Card
          className="!w-full overflow-hidden"
          variant="bordered"
          padding="none"
        >
          <ParseLogTable data={logs} />
        </Card>
      )}
      {data && data.length !== 0 && activeTab === "data" && (
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
