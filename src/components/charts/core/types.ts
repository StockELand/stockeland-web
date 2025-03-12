export interface ChartData {
  label: string | Date;
  value: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ChartProps {
  width?: number;
  height?: number;
  margin?: MarginType;
  className?: string;
}

export interface CustomTooltipProps<T extends ChartData = ChartData> {
  pos: Pos2D;
  data?: T;
  visible: boolean;
}

export type MarginType = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type Pos2D = {
  x: number;
  y: number;
};

export interface LineChartProps<T extends ChartData = ChartData>
  extends ChartProps {
  data: T[];
  strokeColor?: string;
  TooltipComponent?: React.ComponentType<CustomTooltipProps<T>>;
}

export interface ChartConfig<T extends ChartData> {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
  margin: MarginType;
  width: number;
  height: number;
  xScale: d3.ScalePoint<string>;
  yScale: d3.ScaleLinear<number, number, never>;
  data: T[];
}
