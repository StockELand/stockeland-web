// components/CalendarView.tsx
import Calendar from "./Calendar";
import { useDatePicker } from "../_hooks/useDatePicker";
import { CalendarViewProps } from "../types";
import { LeftArrow, RightArrow } from "./Icons";

export default function CalendarView({
  doubleCalendar = false,
  ...props
}: CalendarViewProps) {
  const {
    selectedDate,
    currentMonth,
    goToNextMonth,
    goToPreviousMonth,
    setCurrentMonth,
    getDisplayTypeAndColor,
    view,
    setView,
    isDateInRange,
    rangeDate,
    handleDateSelect,
  } = useDatePicker({
    doubleCalendar,
    ...props,
  });

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
          selectedDate={selectedDate}
          currentMonth={currentMonth}
          onSelect={handleDateSelect}
          view={view}
          setView={setView}
          setCurrentMonth={setCurrentMonth}
          getDisplayTypeAndColor={getDisplayTypeAndColor}
          isDateInRange={isDateInRange}
          rangeDate={rangeDate}
        />
        {doubleCalendar && view == "date" && (
          <Calendar
            selectedDate={selectedDate}
            currentMonth={
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
            }
            getDisplayTypeAndColor={getDisplayTypeAndColor}
            onSelect={handleDateSelect}
            view={view}
            setView={setView}
            setCurrentMonth={setCurrentMonth}
            isDateInRange={isDateInRange}
            rangeDate={rangeDate}
          />
        )}
      </div>
    </div>
  );
}
