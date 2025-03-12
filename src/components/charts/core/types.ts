export interface ChartData {
  label: string | Date;
  value: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ChartProps<T extends ChartData = ChartData> {
  width?: number;
  height?: number;
  margin?: Margin;
  className?: string;
  useChartHook?: any;
  data: T[];
  strokeColor?: string;
  TooltipComponent?: React.ComponentType<CustomTooltipProps<T>>;
}

export interface CustomTooltipProps<T extends ChartData = ChartData> {
  pos: Pos2D;
  data?: T;
  visible: boolean;
}

export type Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type Pos2D = {
  x: number;
  y: number;
};

export type LineChartProps<T extends ChartData = ChartData> = ChartProps<T>;

export type BarChartProps<T extends ChartData = ChartData> = ChartProps<T>;

export interface ChartConfig<T extends ChartData> {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
  margin: Margin;
  width: number;
  height: number;
  xScale: d3.ScalePoint<string>;
  yScale: d3.ScaleLinear<number, number, never>;
  data: T[];
}
