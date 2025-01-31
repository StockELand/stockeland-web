interface ButtonProps {
  children: string;
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
      className={`h-12 text-sm font-bold bg-signature2 rounded-md text-inverseForground ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
{
  /* <button className="h-12 text-sm font-bold bg-signature2 rounded-md text-gray-900"></button> */
}
