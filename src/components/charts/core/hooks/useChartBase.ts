import * as d3 from "d3";
import { useRef, useState, useCallback } from "react";
import { ChartData, CustomTooltipProps, Margin } from "../types";

/**
 * `useChartBase`는 BarChart, LineChart의 공통 로직을 처리하는 훅입니다.
 */
export function useChartBase<T extends ChartData>(
  margin: Margin,
  xScale: d3.ScalePoint<string> | d3.ScaleBand<string>,
  yScale: d3.ScaleLinear<number, number, never>
) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [tooltip, setTooltip] = useState<CustomTooltipProps<T>>({
    pos: { x: 0, y: 0 },
    visible: false,
  });

  const handlePointerMove = useCallback(
    (closestData: T) => {
      setTooltip((prev) => ({
        ...prev,
        pos: {
          x: xScale(closestData.label.toString())! + margin.left,
          y: yScale(closestData.value) + margin.top,
        },
        data: closestData,
        visible: true,
      }));
    },
    [margin.left, margin.top, xScale, yScale]
  );

  const handlePointerLeave = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  return { svgRef, tooltip, handlePointerMove, handlePointerLeave };
}
