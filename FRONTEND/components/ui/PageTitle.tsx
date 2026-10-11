"use client";

import React from "react";
import { useApp } from "@/lib/context/AppContext";

export interface PageTitleProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
}

export function PageTitle({ eyebrow, title, subtitle, actions }: PageTitleProps) {
  const { tr } = useApp();

  return (
    <div className="page-title">
      <div>
        {eyebrow && <div className="eyebrow">{tr(eyebrow)}</div>}
        <h1>{tr(title)}</h1>
        <p>{tr(subtitle)}</p>
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </div>
  );
}

export default PageTitle;
