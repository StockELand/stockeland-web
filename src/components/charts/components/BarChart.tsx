import React from "react";
import { BarChartProps } from "../core/types";
import ChartBase from "./ChartBase";
import { useBarChart } from "../core/hooks/useBarChart";

const LineChart = <T extends { label: string | Date; value: number }>(
  props: BarChartProps<T>
) => {
  return <ChartBase<T> {...props} useChartHook={useBarChart} />;
};

export default LineChart;
