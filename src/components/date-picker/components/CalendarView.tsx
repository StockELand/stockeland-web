// components/CalendarView.tsx
import Calendar from "./Calendar";
import { useDatePicker } from "../hooks/useDatePicker";
import { CalendarViewProps } from "../types";
import { LeftArrow, RightArrow } from "./Icons";

export default function CalendarView({
  selectedDate,
  onChange,
  displayDateGroups,
  doubleCalendar = false,
  onDateRangeChange,
}: CalendarViewProps) {
  const {
    selectedDate: internalSelectedDate,
    setSelectedDate,
    currentMonth,
    goToNextMonth,
    goToPreviousMonth,
    setCurrentMonth,
    getDisplayTypeAndColor,
    view,
    setView,
  } = useDatePicker({
    selectedDate,
    doubleCalendar,
    displayDateGroups,
    onDateRangeChange,
  });

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    onChange?.(date);
  };

  return (
    <div className="relative">
      <div className="relative flex bg-background1 w-fit rounded-2xl">
        {view == "date" && (
          <div className="absolute flex w-full h-11 top-3 justify-between px-6 z-1 ">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-outline1 rounded-lg text-lg"
            >
              <LeftArrow />
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-outline1 rounded-lg text-lg"
            >
              <RightArrow />
            </button>
          </div>
        )}
        <Calendar
          selectedDate={internalSelectedDate}
          currentMonth={currentMonth}
          onSelect={handleDateSelect}
          view={view}
          setView={setView}
          setCurrentMonth={setCurrentMonth}
          getDisplayTypeAndColor={getDisplayTypeAndColor}
        />
        {doubleCalendar && view == "date" && (
          <Calendar
            selectedDate={internalSelectedDate}
            currentMonth={
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
            }
            getDisplayTypeAndColor={getDisplayTypeAndColor}
            onSelect={handleDateSelect}
            view={view}
            setView={setView}
            setCurrentMonth={setCurrentMonth}
          />
        )}
      </div>
    </div>
  );
}
