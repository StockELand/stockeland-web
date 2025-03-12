import * as d3 from "d3";
import { useEffect, useMemo } from "react";
import { ChartConfig, ChartData, Margin } from "../types";
import { drawGuideLines } from "../utils/drawGuideLines";
import { attachInteraction } from "../utils/attachInteraction";
import { useChartBase } from "./useChartBase";

export function useBarChart<T extends ChartData>(
  data: T[],
  width: number,
  height: number,
  margin: Margin
) {
  const {
    svgRef,
    tooltip,
    handlePointerMove,
    handlePointerLeave,
    sharedData,
    setSharedData,
    xScale,
    yScale,
    updateGuideLines,
    resetGuideLines,
  } = useChartBase(
    data,
    width,
    height,
    margin,
    (data, width) =>
      d3
        .scaleBand()
        .domain(data.map((d) => d.label.toString()))
        .range([0, width]),
    (data, height) => {
      const values = data.map((d) => d.value);
      const yMin = Math.min(...values);
      const yMax = Math.max(...values);
      return d3.scaleLinear().domain([yMin, yMax]).nice().range([height, 0]);
    }
  );

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
      .attr("y", height)
      .attr("width", xScale.bandwidth() * 0.95)
      .attr("height", 0)
      .attr("fill", "currentColor")
      .attr("rx", 2)
      .attr("ry", 2)
      .transition()
      .duration(500)
      .ease(d3.easeCubicOut)
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => height - yScale(d.value));

    const { handleUpdateGuideLines, handleResetGuideLines } = drawGuideLines(
      config,
      xOffset
    );
    updateGuideLines.current = handleUpdateGuideLines;
    resetGuideLines.current = handleResetGuideLines;

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
        updateGuideLines.current(matchingData);
      }
    } else {
      handlePointerLeave();
      resetGuideLines.current();
    }
  }, [sharedData]);

  return { svgRef, tooltip };
}
