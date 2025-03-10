import React, { useState, useRef, useEffect, HTMLAttributes } from "react";
import clsx from "clsx";

interface Option {
  key: string;
  value: string;
}

interface AnimatedRadioProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: Option[];
  selected: string;
  onChange: (key: string) => void;
  className?: string;
}

export default function AnimatedRadio({
  options,
  selected,
  onChange,
  className = "",
  ...props
}: AnimatedRadioProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const selectedElement = containerRef.current.querySelector(
      `[data-key="${selected}"]`
    );
    if (selectedElement) {
      const { offsetLeft, offsetWidth } = selectedElement as HTMLElement;
      setIndicatorStyle({ left: offsetLeft - 2, width: offsetWidth - 4 });
    }
  }, [selected, options]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative flex gap-1 bg-background1 p-2 rounded-md w-fit shadow-sm",
        className
      )}
      {...props}
    >
      {/* 선택된 옵션의 애니메이션 박스 */}
      <div
        className="absolute top-0 bottom-0 m-1 bg-background rounded-md hadow-none [box-shadow:inset_0px_0px_4px_rgba(0,0,0,0.2)] transition-all duration-200"
        style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
      />

      {/* 옵션 리스트 */}
      {options.map(({ key, value }) => (
        <button
          key={key}
          data-key={key}
          className={clsx(
            "relative z-10 px-3 py-1 text-thTxt transition-all text-sm",
            selected === key ? "!text-signature2 font-semibold" : "text-thTxt"
          )}
          onClick={() => onChange(key)}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
