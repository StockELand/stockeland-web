import CalendarGrid from "./CalendarGrid";
import MonthPicker from "./MonthPicker";
import YearPicker from "./YearPicker";
import { CalenderProps } from "../types";

export default function Calendar({
  selectedDate,
  currentMonth,
  onSelect,
  setCurrentMonth,
  getDisplayTypeAndColor,
  view,
  setView,
}: CalenderProps) {
  return (
    <div className="p-3 flex flex-col w-[356px]">
      <div className="flex flex-row w-fit mx-auto font-bold text-lg z-10">
        <button
          className={`p-2 hover:bg-outline1 rounded-lg ${
            view === "year" && "text-signature"
          }`}
          onClick={() => setView("year")}
        >
          {currentMonth.getFullYear()}년
        </button>
        <button
          className={`p-2 hover:bg-outline1 rounded-lg ${
            view === "month" && "text-signature"
          }`}
          onClick={() => setView("month")}
        >
          {currentMonth.getMonth() + 1}월
        </button>
      </div>

      {view === "date" && (
        <CalendarGrid
          selectedDate={selectedDate}
          currentMonth={currentMonth}
          onSelect={onSelect}
          getDisplayTypeAndColor={getDisplayTypeAndColor}
        />
      )}
      {view === "month" && (
        <MonthPicker setCurrentMonth={setCurrentMonth} setView={setView} />
      )}
      {view === "year" && (
        <YearPicker setCurrentMonth={setCurrentMonth} setView={setView} />
      )}
    </div>
  );
}
