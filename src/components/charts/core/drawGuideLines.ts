import { ChartConfig, ChartData } from "./types";

export function drawGuideLines<T extends ChartData>(config: ChartConfig<T>) {
  const { g, height, width, xScale, yScale } = config;

  const verticalLine = g
    .append("line")
    .attr("stroke", "gray")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "4 4") // 점선 스타일
    .attr("y1", 0)
    .attr("y2", height)
    .style("opacity", 0); // 초기에는 숨김

  const horizontalLine = g
    .append("line")
    .attr("stroke", "gray")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "4 4") // 점선 스타일
    .attr("x1", 0)
    .attr("x2", width)
    .style("opacity", 0); // 초기에는 숨김

  const handleUpdateGuideLines = (closestData: T) => {
    verticalLine
      .attr("x1", xScale(closestData.label.toString())!)
      .attr("x2", xScale(closestData.label.toString())!)
      .style("opacity", 1);

    horizontalLine
      .attr("y1", yScale(closestData.value)!)
      .attr("y2", yScale(closestData.value)!)
      .style("opacity", 1);
  };

  const handleResetGuideLines = () => {
    verticalLine.style("opacity", 0);
    horizontalLine.style("opacity", 0);
  };

  return { handleUpdateGuideLines, handleResetGuideLines };
}
