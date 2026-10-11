"use client";

import React from "react";
import { useApp } from "@/lib/context/AppContext";

export interface BadgeProps {
  children: React.ReactNode;
  tone?: string;
  className?: string;
}

export function Badge({ children, tone = "neutral", className = "" }: BadgeProps) {
  const { tr } = useApp();
  const text = typeof children === "string" ? tr(children) : children;

  return (
    <span className={`badge badge-${tone} ${className}`}>
      <span className="badge-dot" />
      {text}
    </span>
  );
}

export default Badge;
