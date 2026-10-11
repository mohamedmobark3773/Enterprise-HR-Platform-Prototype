"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";

export function Stage8Toast({ message }: { message: string | null }) {
  const { tr } = useApp();
  if (!message) return null;
  return (
    <div className="stage8-toast" role="status" aria-live="polite">
      <Icon name="check" size={14} /> {tr(message)}
    </div>
  );
}

export default Stage8Toast;
