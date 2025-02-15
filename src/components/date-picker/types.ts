import { Dispatch, SetStateAction } from "react";

export interface DatePickerProps extends UseDatePickerProps {
  onChange?: (date: Date | null) => void;
  inputComponent?: HTMLInputElement;
}

export interface UseDatePickerProps {
  selectedDate?: Date | null;
  displayDateGroups?: DisplayDateGroup[];
  doubleCalendar?: boolean;
}

export interface CalenderProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  currentMonth: Date;
  setCurrentMonth: Dispatch<SetStateAction<Date>>;
  view: ViewType;
  setView: Dispatch<SetStateAction<ViewType>>;
  getDisplayTypeAndColor: (
    date: Date
  ) => { type: string; color: string } | null;
}
export type ViewType = "date" | "month" | "year";

export interface DisplayDateGroup {
  type: string;
  dates: Date[];
  color: string;
}

export interface PickerProps {
  setCurrentMonth: Dispatch<SetStateAction<Date>>;
  setView: (type: ViewType) => void;
}

export interface CalendarGridProps {
  selectedDate: Date | null;
  currentMonth: Date;
  onSelect: (date: Date) => void;
  getDisplayTypeAndColor: (
    date: Date
  ) => { type: string; color: string } | null;
}
