"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Overlay";
import { useApp } from "@/lib/context/AppContext";

export interface Stage8Field {
  key: string;
  label: string;
  type?: "text" | "select" | "textarea" | "number";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  unit?: string;
  wide?: boolean;
}

export function Stage8FormModal({
  title,
  subtitle,
  fields,
  initial = {},
  submitLabel = "Save",
  onSubmit,
  onClose,
}: {
  title: string;
  subtitle?: string;
  fields: Stage8Field[];
  initial?: Record<string, string>;
  submitLabel?: string;
  onSubmit: (values: Record<string, string>) => void;
  onClose: () => void;
}) {
  const { tr } = useApp();
  const [values, setValues] = useState<Record<string, string>>(() => {
    const seed: Record<string, string> = {};
    fields.forEach((field) => {
      seed[field.key] = initial[field.key] ?? (field.type === "select" ? field.options?.[0] ?? "" : "");
    });
    return seed;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setValue = (key: string, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const submit = () => {
    const next: Record<string, string> = {};
    fields.forEach((field) => {
      if (field.required && !values[field.key]?.trim()) next[field.key] = "This field is required";
    });
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    onSubmit(values);
  };

  return (
    <Modal
      title={title}
      subtitle={subtitle}
      onClose={onClose}
      actions={
        <>
          <button type="button" className="stage8-tool" onClick={onClose}>
            {tr("Cancel")}
          </button>
          <button type="button" className="stage8-primary" onClick={submit}>
            {tr(submitLabel)}
          </button>
        </>
      }
    >
      <div className="stage8-form-grid">
        {fields.map((field) => (
          <label key={field.key} className={field.wide ? "stage8-field wide" : "stage8-field"}>
            <span>
              {tr(field.label)}
              {field.required && <em aria-hidden="true"> *</em>}
            </span>
            {field.type === "select" ? (
              <select value={values[field.key]} onChange={(event) => setValue(field.key, event.target.value)}>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {tr(option)}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                rows={3}
                value={values[field.key]}
                placeholder={field.placeholder}
                onChange={(event) => setValue(field.key, event.target.value)}
              />
            ) : (
              <input
                type={field.type === "number" ? "number" : "text"}
                value={values[field.key]}
                placeholder={field.placeholder}
                onChange={(event) => setValue(field.key, event.target.value)}
              />
            )}
            {field.unit && <small className="stage8-field-unit">{tr(field.unit)}</small>}
            {errors[field.key] && <small className="stage8-field-error">{tr(errors[field.key])}</small>}
          </label>
        ))}
      </div>
    </Modal>
  );
}

export default Stage8FormModal;
