import React from "react";
import { LineChartProps } from "../core/types";
import { useLineChart } from "../core/hooks/useLineChart";
import ChartBase from "./ChartBase";

const LineChart = <T extends { label: string | Date; value: number }>(
  props: LineChartProps<T>
) => {
  return <ChartBase<T> {...props} useChartHook={useLineChart} />;
};

export default LineChart;
