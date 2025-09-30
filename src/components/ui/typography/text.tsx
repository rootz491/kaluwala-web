import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  variant?: "body" | "large" | "small" | "muted" | "lead";
  className?: string;
}

const textStyles = {
  body: "text-sm sm:text-base md:text-lg leading-relaxed",
  large: "text-base sm:text-lg md:text-xl leading-relaxed",
  small: "text-xs sm:text-sm text-muted-foreground",
  muted: "text-muted-foreground",
  lead: "text-lg md:text-xl text-muted-foreground leading-relaxed",
};

export function Text({ children, variant = "body", className }: TextProps) {
  return <p className={cn(textStyles[variant], className)}>{children}</p>;
}
