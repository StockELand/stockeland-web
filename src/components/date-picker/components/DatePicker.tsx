import Calendar from "./Calendar";
import { LeftArrow, RightArrow } from "./Icons";
import { DatePickerProps } from "../types";
import { useDatePicker } from "../hooks/useDatePicker";
import { formatLocalDate } from "../utils/formatUtils";

export default function DatePicker({
  selectedDate,
  onChange,
  displayDateGroups,
  doubleCalendar = false,
}: DatePickerProps) {
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
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(formatLocalDate(date));
    if (onChange) onChange(date);
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
