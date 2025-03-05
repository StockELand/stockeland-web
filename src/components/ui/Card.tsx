import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type CardVariant = "default" | "bordered";
type CardPadding = "none" | "small" | "medium" | "large";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
}

export default function Card({
  title,
  children,
  variant = "default",
  padding = "medium",
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "w-full flex flex-col md:w-80 rounded-2xl h-fit",
        {
          "bg-background1": variant === "default",
          "border-outline1 border-[1px]": variant === "bordered",

          "p-0": padding === "none",
          "p-3 space-y-2": padding === "small",
          "p-6 space-y-4": padding === "medium",
        },
        className
      )}
      {...props}
    >
      {title && <h2 className="text-m font-bold text-text">{title}</h2>}
      {children}
    </div>
  );
}
