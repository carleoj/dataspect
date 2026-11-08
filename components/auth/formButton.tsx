import type { ComponentPropsWithoutRef, ReactNode } from "react";

const BASE =
  "hover:cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed";

const VARIANTS = {
  primary:
    "bg-[linear-gradient(180deg,#64748b_0%,#334155_100%)] text-white shadow-[0_1px_2px_rgba(51,65,85,0.4)] hover:brightness-95",
  outline: "border border-slate-200 bg-white text-slate-700 shadow-xs hover:bg-slate-50",
};

const SIZES = {
  sm: "h-10 px-4 text-[13px]",
  md: "h-11 px-5 text-[15px]",
  lg: "h-14 px-8 text-lg",
};

interface FormButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  children: ReactNode;
}

export function FormButton({
  variant = "primary",
  size = "md",
  children,
  className = "",
  type = "button",
  ...props
}: FormButtonProps) {
  return (
    <button
      type={type}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
