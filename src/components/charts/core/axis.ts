import * as d3 from "d3";

export const createXAxis = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  scale: d3.ScaleTime<number, number>
) => {
  svg.call(d3.axisBottom(scale).ticks(6));
};

export const createYAxis = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  scale: d3.ScaleLinear<number, number>
) => {
  svg.call(d3.axisLeft(scale).ticks(5));
};
