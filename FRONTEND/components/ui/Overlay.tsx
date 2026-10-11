"use client";

import React from "react";
import { useApp } from "@/lib/context/AppContext";

export function Modal({ title, subtitle, children, actions, onClose }: { title: string; subtitle?: string; children?: React.ReactNode; actions?: React.ReactNode; onClose?: () => void }) {
  const { tr } = useApp();
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h2>{tr(title)}</h2>
            {subtitle && <p>{tr(subtitle)}</p>}
          </div>
          {onClose && <button className="icon-button" onClick={onClose} aria-label={tr("Close")}>×</button>}
        </div>
        {children}
        {actions && <div className="modal-actions">{actions}</div>}
      </div>
    </div>
  );
}

export function Drawer({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) {
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="profile-drawer" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
