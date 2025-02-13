export interface DatePickerProps extends UseDatePickerProps {
  inputComponent?: HTMLInputElement;
}

export interface UseDatePickerProps {
  highlightedDates?: Date[];
  displayDateGroups?: DisplayDateGroup[];
  doubleCalendar?: boolean;
}

export interface CalenderProps {
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
