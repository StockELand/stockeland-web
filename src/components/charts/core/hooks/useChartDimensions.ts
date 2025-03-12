import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Margin } from "../types";

export function useChartDimensions(margin: Margin) {
  const ref = useRef<HTMLDivElement>(null!);
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null
  );

  const updateSize = useCallback((entries: ResizeObserverEntry[]) => {
    const { width, height } = entries[0]?.contentRect || {
      width: 600,
      height: 300,
    };
    setSize((prev) => {
      if (prev && prev.width === width && prev.height === height) return prev;
      return { width, height };
    });
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateSize]);

  const innerSize = useMemo(() => {
    const width = (size?.width ?? 600) - margin.left - margin.right;
    const height = (size?.height ?? 300) - margin.top - margin.bottom;
    return {
      width: Math.max(width, 0),
      height: Math.max(height, 0),
    };
  }, [size, margin]);

  return {
    ref,
    size: size ?? { width: 600, height: 300 },
    innerSize,
    margin,
  };
}
