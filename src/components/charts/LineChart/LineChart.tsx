import React from "react";
import clsx from "clsx";
import { LineChartProps } from "../core/types";
import { useLineChart } from "./useLineChart";
import { useChartDimensions } from "../core/hooks/useChartDimensions";
import Tooltip from "../components/Tooltip";

const LineChart = <T extends { label: string | Date; value: number }>({
  data,
  strokeColor = "text-sinature2",
  TooltipComponent,
  className = "",
  margin = { bottom: 10, left: 10, right: 10, top: 10 },
}: LineChartProps<T>) => {
  const { ref, size, innerSize } = useChartDimensions(margin);
  const { svgRef, tooltip } = useLineChart(
    data,
    innerSize.width,
    innerSize.height,
    margin
  );

  return (
    <div ref={ref} className={clsx(`relative w-full h-full`, className)}>
      <svg
        ref={svgRef}
        width={size.width}
        height={size.height}
        className={strokeColor}
      />
      <Tooltip
        tooltip={tooltip}
        width={size.width}
        TooltipComponent={TooltipComponent}
      />
    </div>
  );
};

export default LineChart;
