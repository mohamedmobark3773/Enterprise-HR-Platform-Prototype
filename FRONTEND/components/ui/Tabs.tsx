"use client";

import React from "react";
import { useApp } from "@/lib/context/AppContext";

export interface TabsProps {
  tabs: string[];
  active: number;
  onChange?: (index: number) => void;
  className?: string;
}

export function Tabs({ tabs, active, onChange, className = "" }: TabsProps) {
  const { tr } = useApp();
  return (
    <div className={`tabs ${className}`} role="tablist">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          role="tab"
          aria-selected={i === active}
          className={i === active ? "active" : ""}
          onClick={() => onChange?.(i)}
        >
          {tr(tab)}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
