"use client";

import React from "react";
import { useApp } from "@/lib/context/AppContext";

export interface KpiCardProps {
  label: string;
  value: React.ReactNode;
  detail?: string;
  icon?: React.ReactNode;
  tone?: "indigo" | "green" | "amber" | "blue" | "violet" | "teal";
  className?: string;
}

export function KpiCard({ label, value, detail, icon, tone = "indigo", className = "" }: KpiCardProps) {
  const { tr } = useApp();
  return (
    <div className={`kpi-card ${className}`}>
      {icon && <div className={`kpi-icon ${tone}`}>{icon}</div>}
      <span>{tr(label)}</span>
      <strong>{value}</strong>
      {detail && <small>{tr(detail)}</small>}
    </div>
  );
}

export default KpiCard;
