export interface DatePickerProps extends UseDatePickerProps {
  inputComponent?: HTMLInputElement;
}

export interface UseDatePickerProps {
  highlightedDates?: Date[];
  doubleCalendar?: boolean;
}

export interface CalenderProps {
  currentMonth: Date;
  onSelect: (date: Date) => void;
  setCurrentMonth: (date: Date) => void;
  isHighlighted: (date: Date) => boolean;
  view: ViewType;
  setView: (type: ViewType) => void;
}
export type ViewType = "date" | "month" | "year";
