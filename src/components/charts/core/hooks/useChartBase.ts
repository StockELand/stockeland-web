import * as d3 from "d3";
import { useRef, useState, useCallback, useMemo } from "react";
import { ChartData, CustomTooltipProps, Margin } from "../types";
import { useSharedInteraction } from "../../components/SharedInteractionProvider";

/**
 * 📌 `useChartBase`
 * - BarChart, LineChart 등 공통 차트 로직을 처리하는 훅
 * - 스케일 생성, 가이드라인, 툴팁, 마우스 이벤트 관리
 */
export function useChartBase<T extends ChartData>(
  data: T[],
  width: number,
  height: number,
  margin: Margin,
  createXScale: (
    data: T[],
    width: number
  ) => d3.ScalePoint<string> | d3.ScaleBand<string>,
  createYScale: (data: T[], height: number) => d3.ScaleLinear<number, number>
) {
  /** 📌 SVG 요소 참조 */
  const svgRef = useRef<SVGSVGElement | null>(null);

  /** 📌 툴팁 상태 */
  const [tooltip, setTooltip] = useState<CustomTooltipProps<T>>({
    pos: { x: 0, y: 0 },
    visible: false,
  });

  /** 📌 가이드라인 업데이트 함수 (성능 최적화를 위해 useRef 사용) */
  const updateGuideLines = useRef<(data: T) => void>(() => {});
  const resetGuideLines = useRef<() => void>(() => {});

  /** 📌 X축 & Y축 스케일 생성 (useMemo 활용) */
  const xScale = useMemo(() => createXScale(data, width), [data, width]);
  const yScale = useMemo(() => createYScale(data, height), [data, height]);

  /** 📌 공유 인터랙션 (마우스 이벤트 공유) */
  const { sharedData, setSharedData } = useSharedInteraction();

  /**
   * 📌 `handlePointerMove`
   * - 마우스가 차트 위에 있을 때 실행됨
   * - 툴팁 위치 업데이트
   */
  const handlePointerMove = useCallback(
    (closestData: T) => {
      setTooltip((prev) => ({
        ...prev,
        pos: {
          x: xScale(closestData.label.toString())! + margin.left,
          y: yScale(closestData.value) + margin.top,
        },
        data: closestData,
        visible: true,
      }));

      /** 공유 데이터 업데이트 */
      setSharedData(closestData);

      /** 가이드라인 업데이트 */
      updateGuideLines.current(closestData);
    },
    [margin.left, margin.top, xScale, yScale, setSharedData]
  );

  /**
   * 📌 `handlePointerLeave`
   * - 마우스가 차트에서 벗어났을 때 실행됨
   * - 툴팁 숨기기
   */
  const handlePointerLeave = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
    setSharedData(null);
    resetGuideLines.current();
  }, [setSharedData]);

  return {
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
  };
}
