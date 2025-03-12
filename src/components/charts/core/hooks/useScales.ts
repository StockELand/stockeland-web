import * as d3 from "d3";
import { ChartData } from "../types";

export function useScales<T extends ChartData>(
  data: T[],
  width: number,
  height: number
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

  return { xScale, yScale };
}
