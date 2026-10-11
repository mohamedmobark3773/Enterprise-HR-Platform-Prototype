"use client";

import React from "react";
import { Modal } from "@/components/ui/Overlay";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";

interface InventoryConfirmDialogProps {
  open: boolean;
  reference: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function InventoryConfirmDialog({ open, reference, onCancel, onConfirm }: InventoryConfirmDialogProps) {
  const { tr } = useApp();
  if (!open) return null;
  return (
    <Modal
      title={tr("Delete record")}
      subtitle={tr("Demo data · changes apply to this session only")}
      onClose={onCancel}
      actions={
        <>
          <button className="secondary-button" type="button" onClick={onCancel}>
            {tr("Cancel")}
          </button>
          <button className="danger-button" type="button" onClick={onConfirm}>
            <Icon name="trash" size={15} /> {tr("Delete")}
          </button>
        </>
      }
    >
      <div className="form-grid">
        <p className="span-two">
          {tr("Delete")} “{reference}”? {tr("This action cannot be undone.")}
        </p>
      </div>
    </Modal>
  );
}

export default InventoryConfirmDialog;
