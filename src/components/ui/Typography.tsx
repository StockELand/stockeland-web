import clsx from "clsx";
import { ReactNode } from "react";

type TypographyVariant = "h1" | "h2" | "h3" | "body" | "caption" | "small";
type TypographyColor = "default" | "inverse" | "primary" | "danger" | "success";
type TypographyAlign = "left" | "center" | "right" | "justify";

interface TypographyProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: TypographyAlign;
  className?: string;
  children: ReactNode;
}

export default function Typography({
  variant = "body",
  color = "default",
  align = "left",
  className,
  children,
}: TypographyProps) {
  return (
    <p
      className={clsx(
        "mb-6",
        {
          // ✅ 타이포그래피 크기 (variant)
          "text-4xl font-extrabold": variant === "h1",
          "text-3xl font-bold": variant === "h2",
          "text-2xl font-semibold": variant === "h3",
          "text-base": variant === "body",
          "text-sm": variant === "caption",
          "text-xs": variant === "small",

          // ✅ 색상 (color)
          "text-foreground": color === "default",
          "text-inverseForground": color === "inverse",
          "text-signature": color === "primary",
          "text-fall": color === "danger",
          "text-rise": color === "success",

          // ✅ 텍스트 정렬 (align)
          "text-left": align === "left",
          "text-center": align === "center",
          "text-right": align === "right",
          "text-justify": align === "justify",
        },
        className
      )}
    >
      {children}
    </p>
  );
}
