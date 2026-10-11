"use client";

import React from "react";
import { useApp } from "@/lib/context/AppContext";

export function EmptyState({ title, detail, action }: { title: string; detail?: string; action?: React.ReactNode }) {
  const { tr } = useApp();
  return (
    <div className="empty-state">
      <h3>{tr(title)}</h3>
      {detail && <p>{tr(detail)}</p>}
      {action}
    </div>
  );
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  const { tr } = useApp();
  return <div className="empty-state"><p>{tr(label)}</p></div>;
}

export function ErrorState({ title = "Something went wrong", detail, action }: { title?: string; detail?: string; action?: React.ReactNode }) {
  const { tr } = useApp();
  return (
    <div className="empty-state">
      <h3>{tr(title)}</h3>
      {detail && <p>{tr(detail)}</p>}
      {action}
    </div>
  );
}
