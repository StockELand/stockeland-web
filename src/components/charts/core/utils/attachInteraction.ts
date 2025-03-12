import * as d3 from "d3";
import { ChartData, ChartConfig } from "../types";

/**
 * 차트에 마우스 및 터치 이벤트를 추가하는 함수
 *
 * @template T - ChartData 타입을 상속받는 데이터 형식 (label, value 포함)
 *
 * @param {ChartConfig<T>} config - 차트의 기본 설정 객체
 * @param {(closestData: T) => void} moveCallback - 마우스 이동 시 호출할 콜백 함수
 * @param {() => void} leaveCallback - 마우스가 떠날 때 호출할 콜백 함수
 * @param {number} xOffset - X축 보정값 (기본값: 0)
 */
export function attachInteraction<T extends ChartData>(
  config: ChartConfig<T>,
  moveCallback: (closestData: T) => void,
  leaveCallback: () => void,
  xOffset: number = 0 // ✅ X 보정값 기본값 0
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
        event.preventDefault(); // 🔹 터치 기본 스크롤 방지
        mouseX = event.touches[0].clientX - margin.left;
      } else {
        mouseX = d3.pointer(event)[0];
      }

      const closestIndex = data.reduce((bestIndex, d, index) => {
        const currentDistance = Math.abs(
          xScale(d.label.toString())! + xOffset - mouseX
        ); // ✅ X 보정값 적용
        const bestDistance = Math.abs(
          xScale(data[bestIndex].label.toString())! + xOffset - mouseX
        );
        return currentDistance < bestDistance ? index : bestIndex;
      }, 0);

      if (closestIndex !== null && closestIndex >= 0) {
        moveCallback(data[closestIndex]);
      }
    });
}
