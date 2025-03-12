import * as d3 from "d3";
import { useEffect, useMemo } from "react";
import { ChartConfig, ChartData, Margin } from "../types";
import { drawGuideLines } from "../utils/drawGuideLines";
import { attachInteraction } from "../utils/attachInteraction";
import { useChartBase } from "./useChartBase";
import { useSharedInteraction } from "../../components/SharedInteractionProvider";

export function useBarChart<T extends ChartData>(
  data: T[],
  width: number,
  height: number,
  margin: Margin
) {
  const xScale = useMemo(
    () =>
      d3
        .scaleBand()
        .domain(data.map((d) => d.label.toString()))
        .range([0, width]),
    [data, width]
  );

  const yScale = useMemo(() => {
    const values = data.map((d) => d.value);
    const yMin = Math.min(...values);
    const yMax = Math.max(...values);
    const yRange = yMax - yMin;
    const yPadding = yRange === 0 ? 5 : yRange * 0.1;
    return d3
      .scaleLinear()
      .domain([yMin - yPadding, yMax + yPadding])
      .nice()
      .range([height, 0]);
  }, [data, height]);

  const { svgRef, tooltip, handlePointerMove, handlePointerLeave } =
    useChartBase(margin, xScale, yScale);
  const { sharedData, setSharedData } = useSharedInteraction();

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

    // const xOffset = xScale.bandwidth() / 2;
    const xOffset = 0;

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.label.toString())!)
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth() * 0.95)
      .attr("height", (d) => height - yScale(d.value))
      .attr("fill", "currentColor")
      .attr("rx", 2)
      .attr("ry", 2);

    const { handleUpdateGuideLines, handleResetGuideLines } = drawGuideLines(
      config,
      xOffset
    );
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
      },
      xOffset
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
