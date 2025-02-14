import clsx from "clsx";
import React, { HTMLAttributes } from "react";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "caption"
  | "small";
type TypographyColor = "default" | "inverse" | "primary" | "danger" | "success";
type TypographyAlign = "left" | "center" | "right" | "justify";

export interface TypographyProps extends HTMLAttributes<HTMLDivElement> {
  variant?: TypographyVariant;
  color?: TypographyColor;
  textAlign?: TypographyAlign;
  isMargin?: boolean;
}

export default function Typography({
  variant = "body",
  color = "default",
  textAlign = "left",
  className,
  isMargin = true,
  ...props
}: TypographyProps) {
  return (
    <div
      {...props}
      className={clsx(
        {
          "mb-6": isMargin,

          // ✅ 타이포그래피 크기 (variant)
          "text-4xl font-extrabold": variant === "h1",
          "text-3xl font-bold": variant === "h2",
          "text-2xl font-semibold": variant === "h3",
          "text-lg font-semibold": variant === "h4",
          "text-base": variant === "body",
          "text-sm": variant === "caption",
          "text-xs": variant === "small",

          // ✅ 색상 (color)
          "text-foreground": color === "default",
          "text-inverseForground": color === "inverse",
          "text-thTxt": color === "primary",
          "text-fall": color === "danger",
          "text-rise": color === "success",

          // ✅ 텍스트 정렬 (align)
          "text-left": textAlign === "left",
          "text-center": textAlign === "center",
          "text-right": textAlign === "right",
          "text-justify": textAlign === "justify",
        },
        className
      )}
    >
      {props.children}
    </div>
  );
}
