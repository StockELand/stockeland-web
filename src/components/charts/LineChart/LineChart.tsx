import React from "react";
import { LineChartProps } from "../core/types";
import { useLineChart } from "./useLineChart";
import { useResizeObserver } from "../core/useResizeObserver";
import { useTooltipPosition } from "../core/useTooltipPosition";
import clsx from "clsx";

const LineChart = <T extends { label: string | Date; value: number }>({
  data,
  strokeColor = "text-sinature2",
  TooltipComponent,
  className = "",
}: LineChartProps<T>) => {
  const { ref, size } = useResizeObserver();
  const { svgRef, tooltip } = useLineChart(data, size.width, size.height);
  const { tooltipRef, tooltipPosition } = useTooltipPosition(
    tooltip,
    size.width
  );

  return (
    <div ref={ref} className={clsx(`relative w-full`, className)}>
      <svg
        ref={svgRef}
        width={size.width}
        height={size.height}
        className={strokeColor}
      />
      {TooltipComponent && tooltip.visible && (
        <div
          ref={tooltipRef}
          className="absolute"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
          }}
        >
          <TooltipComponent {...tooltip} />
        </div>
      )}
    </div>
  );
};

export default LineChart;
