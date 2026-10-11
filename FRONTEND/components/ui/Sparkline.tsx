import React from "react";

export interface SparklineProps {
  values: number[];
  tone?: string;
  className?: string;
}

export function Sparkline({ values, tone = "blue", className = "" }: SparklineProps) {
  const points = values.map((v, i) => `${i * (100 / (values.length - 1))},${34 - v}`).join(" ");
  return (
    <svg className={`sparkline ${tone} ${className}`} viewBox="0 0 100 36" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

export default Sparkline;
