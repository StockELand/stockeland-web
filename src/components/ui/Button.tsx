import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      className={`cursor-pointer h-12 text-sm font-bold bg-signature2 rounded-md text-inverseForground ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
