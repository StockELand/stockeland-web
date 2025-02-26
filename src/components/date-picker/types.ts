import { Dispatch, SetStateAction } from "react";

export type DatePickerProps = CalendarPopupProps;

export interface CalendarPopupProps extends CalendarViewProps {
  customInput?: React.ReactNode;
}

export type CalendarViewProps = UseDatePickerProps;

export type DateRangeType = { startDate: Date | null; endDate: Date | null };

export interface UseDatePickerProps {
  onChange?: (date: Date | null) => void;
  rangeDate?: DateRangeType;
  selectedDate?: Date | null;
  doubleCalendar?: boolean;
  enableRange?: boolean;
  displayDateGroups?: { [key: string]: DisplayDateGroup };
  onMonthRangeChange?: (range: DateRangeType) => void;
  onRangeChange?: (range: DateRangeType) => void;
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
  isDateInRange?: (date: Date) => boolean;
  rangeDate?: DateRangeType;
}
export type ViewType = "date" | "month" | "year";

export interface DisplayDateGroup {
  dates: string[];
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
  isDateInRange?: (date: Date) => boolean;
  rangeDate?: DateRangeType;
}
