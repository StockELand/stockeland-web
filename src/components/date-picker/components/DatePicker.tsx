import CalendarView from "./CalendarView";
import CalendarPopup from "./CalendarPopup";
import { DatePickerProps } from "../types";

export default function DatePicker({ customInput, ...props }: DatePickerProps) {
  if (customInput) {
    return <CalendarPopup customInput={customInput} {...props} />;
  }

  return <CalendarView {...props} />;
}
