"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FitScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export function FitScoreBadge({ score, size = "md" }: FitScoreBadgeProps) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const step = 16;
    const increment = score / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayed(score);
        clearInterval(timer);
      } else {
        setDisplayed(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [score]);

  const radius = size === "lg" ? 22 : size === "md" ? 18 : 14;
  const strokeWidth = size === "lg" ? 3.5 : size === "md" ? 3 : 2.5;
  const svgSize = (radius + strokeWidth) * 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (displayed / 100) * circumference;

  const color =
    score >= 80
      ? "stroke-emerald-500"
      : score >= 50
      ? "stroke-amber-500"
      : "stroke-red-500";

  const textColor =
    score >= 80
      ? "text-emerald-600 dark:text-emerald-400"
      : score >= 50
      ? "text-amber-600 dark:text-amber-400"
      : "text-red-600 dark:text-red-400";

  const fontSize = size === "lg" ? "text-sm" : size === "md" ? "text-xs" : "text-[10px]";

  return (
    <div className="relative flex items-center justify-center" style={{ width: svgSize, height: svgSize }}>
      <svg width={svgSize} height={svgSize} className="-rotate-90">
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          className="stroke-muted"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          className={cn(color, "transition-all duration-300")}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
        />
      </svg>
      <span className={cn("absolute font-semibold tabular-nums", fontSize, textColor)}>
        {displayed}
      </span>
    </div>
  );
}
