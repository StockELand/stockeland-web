"use client";
import Typography from "@/components/ui/Typography";
import { DatePicker, formatDate } from "@/components/date-picker";
import { useState } from "react";

export default function ProcessStatus() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <>
      <Typography variant="h1" isMargin={false} className="mb-2">
        Parsing
      </Typography>
      <Typography color="primary" variant="h4">
        {selectedDate && formatDate(selectedDate)}
      </Typography>
      <DatePicker
        onChange={setSelectedDate}
        doubleCalendar
        displayDateGroups={[
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
        ]}
      />
    </>
  );
}
