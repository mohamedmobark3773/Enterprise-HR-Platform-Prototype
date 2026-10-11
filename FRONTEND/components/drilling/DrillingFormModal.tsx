"use client";

import React from "react";
import { Modal } from "@/components/ui/Overlay";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import type { DrillingFormField } from "@/lib/drilling/drilling-config-types";
import type { DrillingValue } from "@/types/drilling";

export type DrillingFormValues = Record<string, DrillingValue>;
export type DrillingFormErrors = Record<string, string>;

export interface DrillingFormModalProps {
  title: string;
  subtitle?: string;
  fields: DrillingFormField[];
  values: DrillingFormValues;
  errors: DrillingFormErrors;
  saving: boolean;
  onChange: (key: string, value: DrillingValue) => void;
  onSave: () => void;
  onClose: () => void;
}

function initialFor(field: DrillingFormField): DrillingValue {
  if (field.type === "number") return field.min ?? 0;
  if (field.type === "select") return field.options?.[0] ?? "";
  if (field.type === "date") return new Date().toISOString().slice(0, 10);
  return "";
}

export function defaultFormValues(fields: DrillingFormField[]): DrillingFormValues {
  const values: DrillingFormValues = {};
  fields.forEach((field) => {
    values[field.key] = initialFor(field);
  });
  return values;
}

export function DrillingFormModal({
  title,
  subtitle,
  fields,
  values,
  errors,
  saving,
  onChange,
  onSave,
  onClose,
}: DrillingFormModalProps) {
  const { tr } = useApp();

  return (
    <Modal title={title} subtitle={subtitle} onClose={onClose}
      actions={
        <>
          <button className="secondary-button" type="button" onClick={onClose} disabled={saving}>
            {tr("Cancel")}
          </button>
          <button className="primary-button" type="button" onClick={onSave} disabled={saving}>
            <Icon name="check" size={15} /> {saving ? tr("Saving…") : tr("Save record")}
          </button>
        </>
      }
    >
      <form
        className="form-grid drilling-form-grid"
        onSubmit={(event) => {
          event.preventDefault();
          onSave();
        }}
      >
        {fields.map((field) => {
          const value = values[field.key] ?? "";
          const error = errors[field.key];
          return (
            <label key={field.key} className={field.type === "textarea" ? "drilling-field-wide" : undefined}>
              <span>
                {tr(field.label)}
                {field.required && <em aria-hidden="true"> *</em>}
              </span>
              {field.type === "select" ? (
                <select value={String(value)} onChange={(e) => onChange(field.key, e.target.value)}>
                  {(field.options ?? []).map((option) => (
                    <option key={option} value={option}>
                      {tr(option)}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={String(value)}
                  placeholder={field.placeholder ? tr(field.placeholder) : undefined}
                  onChange={(e) => onChange(field.key, e.target.value)}
                />
              ) : (
                <input
                  type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                  value={String(value)}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  placeholder={field.placeholder ? tr(field.placeholder) : undefined}
                  onChange={(e) =>
                    onChange(field.key, field.type === "number" ? e.target.value : e.target.value)
                  }
                  aria-invalid={error ? true : undefined}
                />
              )}
              {error && <small className="drilling-field-error">{tr(error)}</small>}
              {!error && field.help && <small className="drilling-field-help">{tr(field.help)}</small>}
            </label>
          );
        })}
      </form>
    </Modal>
  );
}

export interface DrillingConfirmDialogProps {
  title: string;
  detail: string;
  confirmLabel: string;
  busy?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function DrillingConfirmDialog({
  title,
  detail,
  confirmLabel,
  busy,
  onConfirm,
  onClose,
}: DrillingConfirmDialogProps) {
  const { tr } = useApp();
  return (
    <Modal
      title={title}
      subtitle={detail}
      onClose={onClose}
      actions={
        <>
          <button className="secondary-button" type="button" onClick={onClose} disabled={busy}>
            {tr("Cancel")}
          </button>
          <button className="danger-button" type="button" onClick={onConfirm} disabled={busy}>
            {busy ? tr("Deleting…") : tr(confirmLabel)}
          </button>
        </>
      }
    >
      <div className="drilling-confirm-body">
        <Icon name="shield" size={22} />
        <p>{tr("This action cannot be undone. The record stays removed for this browser session.")}</p>
      </div>
    </Modal>
  );
}
