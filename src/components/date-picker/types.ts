export interface DatePickerProps extends UseDatePickerProps {
  onChange?: (date: Date) => void;
  inputComponent?: HTMLInputElement;
}

export interface UseDatePickerProps {
  selectedDate?: Date | null;
  highlightedDates?: Date[];
  displayDateGroups?: DisplayDateGroup[];
  doubleCalendar?: boolean;
}

export interface CalenderProps {
  selectedDate: Date | null;
  currentMonth: Date;
  onSelect: (date: Date) => void;
  setCurrentMonth: (date: Date) => void;
  isHighlighted: (date: Date) => boolean;
  view: ViewType;
  setView: (type: ViewType) => void;
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
  setCurrentMonth: (date: Date) => void;
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
