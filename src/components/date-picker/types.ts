import { Dispatch, SetStateAction } from "react";

export type DatePickerProps = CalendarPopupProps;

export interface CalendarPopupProps extends CalendarViewProps {
  customInput?: React.ReactNode;
}

export interface CalendarViewProps extends UseDatePickerProps {
  onChange?: (date: Date | null) => void;
}

export interface UseDatePickerProps {
  selectedDate?: Date | null;
  doubleCalendar?: boolean;
  displayDateGroups?: { [key: string]: DisplayDateGroup };
  onDateRangeChange?: Dispatch<
    SetStateAction<{
      startDate: Date | null;
      endDate: Date | null;
    }>
  >;
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
}
