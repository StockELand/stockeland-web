import { useState, useEffect, useRef } from "react";

export function useResizeObserver() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 600, height: 300 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries[0]?.contentRect) return;
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, size };
}
