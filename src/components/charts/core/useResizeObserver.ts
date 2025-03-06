import { useState, useEffect, useRef, useCallback } from "react";

export function useResizeObserver() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null
  );

  const updateSize = useCallback((entries: ResizeObserverEntry[]) => {
    if (!entries[0]?.contentRect) return;
    const { width, height } = entries[0].contentRect;
    setSize({ width, height });
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateSize]);

  return { ref, size: size ?? { width: 600, height: 300 } };
}
