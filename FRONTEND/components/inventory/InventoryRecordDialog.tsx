"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Overlay";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import type { InventoryRecord, InventoryRecordInput } from "@/lib/inventory/inventory-store";

interface InventoryRecordDialogProps {
  open: boolean;
  mode: "create" | "edit";
  initial?: InventoryRecord | null;
  statuses: string[];
  isReferenceTaken: (reference: string, exceptId?: string) => boolean;
  onClose: () => void;
  onSubmit: (input: InventoryRecordInput) => void;
}

const empty: InventoryRecordInput = { reference: "", name: "", context: "", value: "", status: "" };

export function InventoryRecordDialog({
  open,
  mode,
  initial,
  statuses,
  isReferenceTaken,
  onClose,
  onSubmit,
}: InventoryRecordDialogProps) {
  const { tr } = useApp();
  const [values, setValues] = useState<InventoryRecordInput>(empty);
  const [errors, setErrors] = useState<{ reference?: string; name?: string }>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setValues({
        reference: initial?.reference || "",
        name: initial?.name || "",
        context: initial?.context || "",
        value: initial?.value || "",
        status: initial?.status || statuses[0] || "",
      });
      setErrors({});
      setSaving(false);
    }
  }, [open, initial, statuses]);

  if (!open) return null;

  const set = (key: keyof InventoryRecordInput) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setValues((current) => ({ ...current, [key]: event.target.value }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (saving) return;
    const next: typeof errors = {};
    if (!values.reference.trim()) next.reference = tr("Reference required");
    else if (isReferenceTaken(values.reference, initial?.id)) next.reference = tr("Reference already exists");
    if (!values.name.trim()) next.name = tr("Name required");
    if (next.reference || next.name) {
      setErrors(next);
      return;
    }
    setSaving(true);
    onSubmit(values);
  };

  return (
    <Modal
      title={mode === "create" ? tr("Create record") : tr("Edit record")}
      subtitle={tr("Demo data · changes apply to this session only")}
      onClose={onClose}
      actions={
        <>
          <button className="secondary-button" type="button" onClick={onClose} disabled={saving}>
            {tr("Cancel")}
          </button>
          <button className="primary-button" type="submit" form="inventory-record-form" disabled={saving}>
            <Icon name="check" size={15} /> {saving ? tr("Saving.") : tr("Save")}
          </button>
        </>
      }
    >
      <form id="inventory-record-form" className="form-grid" onSubmit={submit}>
        <label className={errors.reference ? "field-error" : undefined}>
          {tr("Reference")} *
          <input value={values.reference} onChange={set("reference")} placeholder="REF-00000" />
          {errors.reference && <small>{errors.reference}</small>}
        </label>
        <label>
          {tr("Name")} *
          <input value={values.name} onChange={set("name")} placeholder={tr("Name")} />
          {errors.name && <small>{errors.name}</small>}
        </label>
        <label>
          {tr("Context")}
          <input value={values.context} onChange={set("context")} placeholder={tr("Context")} />
        </label>
        <label>
          {tr("Value")}
          <input value={values.value} onChange={set("value")} placeholder="0" />
        </label>
        <label>
          {tr("Status")}
          <select value={values.status} onChange={set("status")}>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {tr(status)}
              </option>
            ))}
          </select>
        </label>
      </form>
    </Modal>
  );
}

export default InventoryRecordDialog;
