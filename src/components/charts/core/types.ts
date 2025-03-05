export interface ChartData {
  label: string | Date;
  value: number;
  [key: string]: any;
}

export interface TooltipProps<T extends ChartData = ChartData> {
  x: number;
  y: number;
  data?: T;
  visible: boolean;
}

export interface LineChartProps<T extends ChartData = ChartData> {
  data: T[];
  width?: number;
  height?: number;
  strokeColor?: string;
  TooltipComponent?: React.ComponentType<TooltipProps<T>>;
  className?: string;
}
