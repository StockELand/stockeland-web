import { useEffect, useRef, useState } from "react";
import { ChartData, CustomTooltipProps, Pos2D } from "../types";

export function useTooltip<T extends ChartData>(
  tooltip: CustomTooltipProps<T>,
  containerWidth: number
) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [tooltipPos, setTooltipPos] = useState<Pos2D>({ x: 0, y: 0 });

  useEffect(() => {
    if (!tooltip.visible || !tooltipRef.current) return;

    const tooltipElement = tooltipRef.current;
    const tooltipWidth = tooltipElement.offsetWidth;
    const padding = 10; // 차트 경계를 넘지 않도록 여백 추가

    let x = tooltip.pos.x;

    // **툴팁이 왼쪽을 벗어남 → 오른쪽으로 이동**
    if (x - tooltipWidth / 2 < padding) {
      x = padding + tooltipWidth / 2;
    }
    // **툴팁이 오른쪽을 벗어남 → 왼쪽으로 이동**
    else if (x + tooltipWidth / 2 > containerWidth - padding) {
      x = containerWidth - tooltipWidth / 2 - padding;
    }

    setTooltipPos({ x, y: tooltip.pos.y });
  }, [tooltip, containerWidth]);

  return { tooltipRef, tooltipPos };
}
