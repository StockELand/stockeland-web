import * as d3 from "d3";
import { ChartData, ChartConfig } from "./types";

export function attachInteraction<T extends ChartData>(
  config: ChartConfig<T>,
  moveCallback: (closestData: T) => void,
  leaveCallback: () => void
) {
  const { g, margin, data, xScale } = config;

  g.append("rect")
    .attr("width", g.node()?.parentElement?.clientWidth || 0)
    .attr("height", g.node()?.parentElement?.clientHeight || 0)
    .attr("fill", "transparent")
    .on("mousemove touchmove mouseleave touchend", (event) => {
      if (event.type === "mouseleave" || event.type === "touchend") {
        leaveCallback();
        return;
      }

      let mouseX;

      if ("touches" in event) {
        event.preventDefault(); // 터치 기본 스크롤 방지
        mouseX = event.touches[0].clientX - margin.left;
      } else {
        mouseX = d3.pointer(event)[0];
      }

      const closestIndex = data.reduce((bestIndex, d, index) => {
        const currentDistance = Math.abs(xScale(d.label.toString())! - mouseX);
        const bestDistance = Math.abs(
          xScale(data[bestIndex].label.toString())! - mouseX
        );
        return currentDistance < bestDistance ? index : bestIndex;
      }, 0);

      if (closestIndex !== null && closestIndex >= 0) {
        moveCallback(data[closestIndex]);
      }
    });
}
