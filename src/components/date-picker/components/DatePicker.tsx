import CalendarView from "./CalendarView";
import CalendarPopup from "./CalendarPopup";
import { DatePickerProps } from "../types";

export default function DatePicker(props: DatePickerProps) {
  if (props.customInput) {
    return <CalendarPopup {...props} />;
  }

  return <CalendarView {...props} />;
}
