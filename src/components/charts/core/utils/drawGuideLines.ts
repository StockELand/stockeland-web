import { ChartConfig, ChartData } from "../types";

/**
 * 차트에 가이드라인을 추가하고 업데이트하는 함수
 *
 * @template T - ChartData 타입을 상속받는 데이터 형식 (label, value 포함)
 *
 * @param {ChartConfig<T>} config - 차트의 기본 설정 객체
 * @param {number} xOffset - X축 가이드라인 위치 보정값 (기본값: 0)
 *
 * @returns {{
 *   handleUpdateGuideLines: (closestData: T) => void;
 *   handleResetGuideLines: () => void;
 * }}
 * - `handleUpdateGuideLines(closestData: T)`: 가장 가까운 데이터 포인트에 맞춰 가이드라인을 업데이트하는 함수
 * - `handleResetGuideLines()`: 가이드라인을 숨기는 함수
 */
export function drawGuideLines<T extends ChartData>(
  config: ChartConfig<T>,
  xOffset: number = 0 // ✅ X 보정값 기본 0
) {
  const { g, height, width, xScale, yScale } = config;

  const verticalLine = g
    .append("line")
    .attr("class", "guide-line")
    .attr("stroke", "gray")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "4 4") // 점선 스타일
    .attr("y1", 0)
    .attr("y2", height)
    .style("opacity", 0); // 초기에는 숨김

  const horizontalLine = g
    .append("line")
    .attr("class", "guide-line")
    .attr("stroke", "gray")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "4 4") // 점선 스타일
    .attr("x1", 0)
    .attr("x2", width)
    .style("opacity", 0); // 초기에는 숨김

  const handleUpdateGuideLines = (closestData: T) => {
    verticalLine
      .attr("x1", xScale(closestData.label.toString())! + xOffset) // ✅ X 보정값 추가
      .attr("x2", xScale(closestData.label.toString())! + xOffset) // ✅ X 보정값 추가
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
