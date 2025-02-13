import Calendar from "./Calendar";
import { LeftArrow, RightArrow } from "./Icons";
import { DatePickerProps } from "./types";
import { useDatePicker } from "./useDatePicker";

export default function DatePicker({
  highlightedDates,
  doubleCalendar = false,
}: DatePickerProps) {
  const {
    selectedDate,
    setSelectedDate,
    currentMonth,
    isHighlighted,
    goToNextMonth,
    goToPreviousMonth,
    setCurrentMonth,
    view,
    setView,
  } = useDatePicker({ highlightedDates, doubleCalendar });

  return (
    <div className="relative">
      {selectedDate && selectedDate.toISOString()}
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
          currentMonth={currentMonth}
          onSelect={setSelectedDate}
          isHighlighted={isHighlighted}
          view={view}
          setView={setView}
          setCurrentMonth={setCurrentMonth}
        />
        {doubleCalendar && view == "date" && (
          <Calendar
            currentMonth={
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
            }
            onSelect={setSelectedDate}
            isHighlighted={isHighlighted}
            view={view}
            setView={setView}
            setCurrentMonth={setCurrentMonth}
          />
        )}
      </div>
    </div>
  );
}
