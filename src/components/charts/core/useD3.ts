import { useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

export function useD3<T extends SVGSVGElement | HTMLElement>(
  renderChartFn: (svg: d3.Selection<T, unknown, null, undefined>) => void,
  dependencies: unknown[]
) {
  const ref = useRef<T>(null);

  const memoizedRenderChart = useCallback(
    (svgElement: T) => {
      const svg = d3.select(svgElement);
      renderChartFn(svg);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [renderChartFn, ...dependencies]
  );

  useEffect(() => {
    if (ref.current) {
      memoizedRenderChart(ref.current);
    }
  }, [memoizedRenderChart]);

  return ref;
}
