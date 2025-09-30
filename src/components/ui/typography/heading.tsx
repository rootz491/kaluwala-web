import { cn } from "@/lib/utils";
import { ReactNode, createElement } from "react";

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

const headingStyles = {
  1: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight",
  2: "text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold",
  3: "text-xl sm:text-2xl md:text-3xl font-bold",
  4: "text-lg sm:text-xl md:text-2xl font-semibold",
  5: "text-base sm:text-lg md:text-xl font-semibold",
  6: "text-sm sm:text-base md:text-lg font-semibold",
};

export function Heading({ children, level = 1, className }: HeadingProps) {
  return createElement(
    `h${level}`,
    { className: cn(headingStyles[level], className) },
    children
  );
}
