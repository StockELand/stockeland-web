import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { ChartData, TooltipProps } from "../core/types";

export function useLineChart<T extends ChartData>(
  data: T[],
  width: number,
  height: number
) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [tooltip, setTooltip] = useState<TooltipProps<T>>({
    x: 0,
    y: 0,
    visible: false,
  });

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // 기존 요소 제거

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // X축 스케일 (시간 또는 범주형 데이터)
    const xScale = d3
      .scalePoint()
      .domain(data.map((d) => d.label.toString()))
      .range([0, innerWidth]);

    // **Y축 스케일 설정 (완벽한 자동 조정)**
    const closePrices = data.map((d) => parseFloat(d.close));
    const yMin = Math.min(...closePrices);
    const yMax = Math.max(...closePrices);
    const yRange = yMax - yMin;

    // ✅ 변동성이 없는 경우 (모든 값이 동일) 최소 yPadding 제공
    const yPaddingRatio = Math.max(0.05, Math.min(0.3, yRange / yMax)); // 변동성에 따른 자동 패딩 조정
    const yPadding = yRange === 0 ? 5 : yRange * yPaddingRatio;

    // ✅ 안전한 Y축 범위 설정 (모든 데이터 포함)
    const safeMin = isFinite(yMin - yPadding) ? yMin - yPadding : yMin - 5;
    const safeMax = isFinite(yMax + yPadding) ? yMax + yPadding : yMax + 5;

    // ✅ Y축 스케일 적용
    const yScale = d3
      .scaleLinear()
      .domain([safeMin, safeMax])
      .nice()
      .range([innerHeight, 0]);

    // 라인 생성
    const line = d3
      .line<T>()
      .x((d) => xScale(d.label.toString())!)
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 🔹 **라인 애니메이션 추가**
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 2)
      .attr("d", line)
      .attr("stroke-dasharray", function () {
        return this.getTotalLength();
      })
      .attr("stroke-dashoffset", function () {
        return this.getTotalLength();
      })
      .transition()
      .duration(1000) // 애니메이션 지속 시간 (1초)
      .ease(d3.easeCubicInOut)
      .attr("stroke-dashoffset", 0);

    // 🔹 **데이터 포인트(dot) 추가**

    // 🔹 **툴팁 위치에 세로선 추가**
    const verticalLine = g
      .append("line")
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4 4") // 점선 스타일
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .style("opacity", 0); // 초기에는 숨김

    // 🔹 **마우스 이벤트 추가**
    g.append("rect")
      .attr("width", innerWidth)
      .attr("height", innerHeight)
      .attr("fill", "transparent")
      // ✅ 마우스 이벤트
      .on("mousemove", (event) => handlePointerMove(event))
      .on("mouseleave", () => handlePointerLeave())
      // ✅ 모바일 터치 이벤트 추가
      .on("touchstart", (event) => handlePointerMove(event))
      .on("touchmove", (event) => handlePointerMove(event))
      .on("touchend", () => handlePointerLeave());

    // 🔹 **이벤트 핸들러 분리**
    function handlePointerMove(event: MouseEvent | TouchEvent) {
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
        const closestData = data[closestIndex];

        setTooltip({
          x: xScale(closestData.label.toString())! + margin.left,
          y: yScale(closestData.value) + margin.top,
          data: closestData,
          visible: true,
        });

        // 🔹 **세로선 업데이트**
        verticalLine
          .attr("x1", xScale(closestData.label.toString())!)
          .attr("x2", xScale(closestData.label.toString())!)
          .style("opacity", 1);
      }
    }

    // 🔹 **터치 종료 & 마우스 나갈 때 툴팁 제거**
    function handlePointerLeave() {
      setTooltip((prev) => ({ ...prev, visible: false }));
      verticalLine.style("opacity", 0);
    }
  }, [data, width, height]);

  return { svgRef, tooltip };
}
