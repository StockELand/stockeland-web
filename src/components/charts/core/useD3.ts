import { useEffect, useRef } from "react";
import * as d3 from "d3";

export function useD3<T extends SVGSVGElement | HTMLElement>(
  renderChartFn: (svg: d3.Selection<T, unknown, null, undefined>) => void,
  dependencies: unknown[]
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      renderChartFn(d3.select(ref.current));
    }
  }, dependencies);

  return ref;
}
