import * as d3 from "d3";
import { ChartConfig, ChartData } from "./types";

export function drawLines<T extends ChartData>(
  config: ChartConfig<T>,
  color: string = "currentColor"
) {
  const { g, xScale, yScale, data } = config;

  const lineGenerator = d3
    .line<T>()
    .x((d) => xScale(d.label.toString())!)
    .y((d) => yScale(d.value));

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", color)
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
}
