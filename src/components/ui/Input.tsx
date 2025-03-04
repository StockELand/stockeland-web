import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

// ✅ Input Props 정의
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode; // 좌측 아이콘
  rightIcon?: ReactNode; // 우측 아이콘
  error?: string; // 에러 메시지
  helperText?: string; // 헬퍼 텍스트
  inputSize?: "sm" | "md" | "lg"; // 크기 옵션
  fullWidth?: boolean; // 전체 너비 여부
  variant?: "outline" | "filled" | "standard"; // 스타일 종류
  textAlign?: "left" | "center" | "right"; // ✅ 텍스트 정렬 추가
}

// ✅ Input 컴포넌트 구현
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      leftIcon,
      rightIcon,
      error,
      helperText,
      inputSize = "md",
      fullWidth = false,
      variant = "outline",
      textAlign = "left", // ✅ 기본값 설정
      className,
      ...props
    },
    ref
  ) => {
    // 🔧 크기별 스타일
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-5 py-3 text-base",
      lg: "px-6 py-4 text-lg",
    };

    // 🎨 텍스트 정렬별 클래스
    const textAlignClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    // 🎨 스타일 종류별 클래스 (호버 및 포커스 시 테두리 색상 변경 추가)
    const variantClasses = {
      outline:
        "border border-outline1 hover:border-signature focus-within:border-signature transition-all",
      filled:
        "bg-background1 border border-transparent hover:border-signature focus-within:border-signature transition-all",
      standard:
        "border-b border-background1 hover:border-signature focus-within:border-signature transition-all",
    };

    return (
      <div className={clsx("flex flex-col", fullWidth && "w-full")}>
        <div
          className={clsx(
            "relative flex items-center rounded-lg transition-all group",
            sizeClasses[inputSize],
            variantClasses[variant],
            error ? "!border-fall" : "",
            fullWidth ? "w-full" : "w-fit",
            className
          )}
        >
          {/* 좌측 아이콘 (테두리와 함께 색상 변경) */}
          {leftIcon && (
            <div className="absolute left-3 text-outline1 transition-all group-hover:text-signature group-focus-within:text-signature">
              {leftIcon}
            </div>
          )}

          {/* 입력 필드 */}
          <input
            ref={ref}
            {...props}
            className={clsx(
              "outline-none bg-transparent w-full",
              textAlignClasses[textAlign], // ✅ 텍스트 정렬 클래스 적용
              leftIcon && "pl-10",
              rightIcon && "pr-10"
            )}
          />

          {/* 우측 아이콘 (테두리와 함께 색상 변경) */}
          {rightIcon && (
            <div className="absolute right-3 text-outline1 transition-all group-hover:text-signature group-focus-within:text-signature">
              {rightIcon}
            </div>
          )}
        </div>

        {/* 헬퍼 텍스트 */}
        {helperText && !error && (
          <p className="text-xs text-outline1 mt-1">{helperText}</p>
        )}
        {/* 에러 메시지 */}
        {error && <p className="text-xs text-fall">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
