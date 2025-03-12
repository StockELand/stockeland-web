import * as d3 from "d3";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  ChartData,
  MarginType,
  CustomTooltipProps,
  ChartConfig,
} from "../core/types";
import { useScales } from "../core/hooks/useScales";
import { drawGradient } from "../core/drawGradient";
import { drawGuideLines } from "../core/drawGuideLines";
import { drawLines } from "../core/drawLines";
import { attachInteraction } from "../core/attachInteraction";

export function useLineChart<T extends ChartData>(
  data: T[],
  width: number,
  height: number,
  margin: MarginType
) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [tooltip, setTooltip] = useState<CustomTooltipProps<T>>({
    pos: { x: 0, y: 0 },
    visible: false,
  });

  const { xScale, yScale } = useScales(data, width, height);

  // 📌 `ChartConfig` 객체를 useMemo를 사용해 캐싱 (불필요한 재생성 방지)
  const config = useMemo<ChartConfig<T>>(
    () => ({
      svg: d3.select(svgRef.current!),
      g: d3.select(svgRef.current).select("g"),
      margin,
      width,
      height,
      xScale,
      yScale,
      data,
    }),
    [data, width, height, margin, xScale, yScale]
  );

  // 📌 `handlePointerMove`를 useCallback으로 최적화 (불필요한 함수 생성 방지)
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
    [xScale, yScale]
  );

  // 📌 `handlePointerLeave`를 useCallback으로 최적화 (불필요한 함수 생성 방지)
  const handlePointerLeave = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    config.svg = svg;
    config.g = g;

    drawGradient(config);
    drawLines(config);

    const { handleUpdateGuideLines, handleResetGuideLines } =
      drawGuideLines(config);

    attachInteraction(
      config,
      (closestData) => {
        handlePointerMove(closestData);
        handleUpdateGuideLines(closestData);
      },
      () => {
        handlePointerLeave();
        handleResetGuideLines();
      }
    );
  }, [width, height, data]);

  return { svgRef, tooltip };
}
