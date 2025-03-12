import * as d3 from "d3";
import { useEffect, useMemo } from "react";
import { ChartData, Margin, ChartConfig } from "../types";
import { drawGuideLines } from "../utils/drawGuideLines";
import { attachInteraction } from "../utils/attachInteraction";
import { useChartBase } from "./useChartBase";
import { useSharedInteraction } from "../../components/SharedInteractionProvider";

export function useLineChart<T extends ChartData>(
  data: T[],
  width: number,
  height: number,
  margin: Margin
) {
  const xScale = d3
    .scalePoint()
    .domain(data.map((d) => d.label.toString()))
    .range([0, width]);

  const values = data.map((d) => d.value);
  const yMin = Math.min(...values);
  const yMax = Math.max(...values);
  const yRange = yMax - yMin;
  const yPadding = yRange === 0 ? 5 : yRange * 0.1;

  const yScale = d3
    .scaleLinear()
    .domain([yMin - yPadding, yMax + yPadding])
    .nice()
    .range([height, 0]);

  const { svgRef, tooltip, handlePointerMove, handlePointerLeave } =
    useChartBase(margin, xScale, yScale);
  const { sharedData, setSharedData } = useSharedInteraction();

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

    const lineGenerator = d3
      .line<T>()
      .x((d) => xScale(d.label.toString())!)
      .y((d) => yScale(d.value));

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 2)
      .attr("d", lineGenerator)
      .attr("stroke-dasharray", function () {
        return this.getTotalLength();
      })
      .attr("stroke-dashoffset", function () {
        return this.getTotalLength();
      })
      .transition()
      .duration(500)
      .ease(d3.easeCubicInOut)
      .attr("stroke-dashoffset", 0);

    const { handleUpdateGuideLines, handleResetGuideLines } =
      drawGuideLines(config);

    attachInteraction(
      config,
      (closestData) => {
        handlePointerMove(closestData);
        handleUpdateGuideLines(closestData);
        setSharedData(closestData);
      },
      () => {
        handlePointerLeave();
        handleResetGuideLines();
        setSharedData(null);
      }
    );
  }, [width, height, data]);

  useEffect(() => {
    if (sharedData) {
      const matchingData = data.find(
        (d) => d.label.toString() === sharedData.label.toString()
      );
      if (matchingData) {
        handlePointerMove(matchingData);
      }
    } else {
      handlePointerLeave();
    }
  }, [sharedData]);

  return { svgRef, tooltip };
}

export function drawGradient<T extends ChartData>(
  config: ChartConfig<T>,
  gradientId: string = "gradient",
  clipPathId: string = "clip-path"
) {
  const { svg, g, width, height, xScale, yScale, data } = config;

  const defs = svg.append("defs");
  const gradient = defs
    .append("linearGradient")
    .attr("id", gradientId)
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "100%");

  gradient
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "currentColor")
    .attr("stop-opacity", 0.2);

  gradient
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "currentColor")
    .attr("stop-opacity", 0);

  defs
    .append("clipPath")
    .attr("id", clipPathId)
    .append("rect")
    .attr("width", width)
    .attr("height", 0) // 초기 높이 0
    .transition()
    .delay(300)
    .duration(500)
    .ease(d3.easeCubicInOut)
    .attr("height", height);

  const area = d3
    .area<T>()
    .x((d) => xScale(d.label.toString())!)
    .y0(height)
    .y1((d) => yScale(d.value));

  g.append("path")
    .datum(data)
    .attr("fill", `url(#${gradientId})`)
    .attr("clip-path", `url(#${clipPathId})`)
    .attr("d", area);
}
