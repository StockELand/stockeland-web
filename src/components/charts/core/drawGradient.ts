import * as d3 from "d3";
import { ChartConfig, ChartData } from "./types";

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
