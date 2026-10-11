"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { DocumentRecord, initialDocuments } from "@/types/documents";
import { useApp } from "@/lib/context/AppContext";

export function DocumentsCenterView() {
  const [tab, setTab] = useState("All documents");
  const [docs, setDocs] = useState<DocumentRecord[]>(initialDocuments);
  const [editing, setEditing] = useState<DocumentRecord | null>(null);
  const [selected, setSelected] = useState<DocumentRecord | null>(null);
  const [message, setMessage] = useState("");
  const { tr } = useApp();

  const empty: DocumentRecord = {
    id: "",
    employee: "Jordan Lee",
    type: "Contract",
    issue: "2025-03-14",
    expiry: "2026-03-14",
    status: "Valid",
    version: 1,
    file: "",
    size: 0,
    uploadedBy: "Maya Chen",
    archived: false,
  };

  const save = () => {
    if (!editing) return;
    if (!editing.file) {
      setMessage("Select a supported PDF, PNG or JPG file.");
      return;
    }
    if (editing.size > 10) {
      setMessage("File size must be below 10 MB.");
      return;
    }
    if (editing.expiry && editing.issue > editing.expiry) {
      setMessage("Expiry date must be after issue date.");
      return;
    }
    const item: DocumentRecord = {
      ...editing,
      id: editing.id || `DOC-${1050 + docs.length}`,
    };
    setDocs((all) =>
      editing.id ? all.map((x) => (x.id === editing.id ? item : x)) : [item, ...all]
    );
    setMessage("Document saved successfully.");
    setEditing(null);
  };

  const replaceVersion = (doc: DocumentRecord) => {
    const updated = {
      ...doc,
      version: doc.version + 1,
      file: doc.file.replace(/(\.[^.]+)$/, `-v${doc.version + 1}$1`),
    };
    setDocs((all) => all.map((x) => (x.id === doc.id ? updated : x)));
    setSelected(updated);
    setMessage(`Version v${updated.version} is now current.`);
  };

  const tabs = [
    "All documents",
    "Expiring",
    "Expired",
    "Missing",
    "Under review",
    "Version history",
  ];

  return (
    <>
      <PageTitle
        eyebrow="Employee records"
        title="Documents"
        subtitle="Validated uploads, metadata, expiry tracking and version history"
        actions={
          <button
            className="primary-button"
            onClick={() => {
              setEditing(empty);
              setMessage("");
            }}
          >
            <Icon name="plus" /> {tr("Upload document")}
          </button>
        }
      />

      {message && (
        <div className="status-bar">
          <Icon name="check" />
          {tr(message)}
          <button onClick={() => setMessage("")}>{tr("Dismiss")}</button>
        </div>
      )}

      <div className="tabs">
        {tabs.map((x) => (
          <button
            className={tab === x ? "active" : ""}
            onClick={() => setTab(x)}
            key={x}
          >
            {tr(x)}
          </button>
        ))}
      </div>

      <div className="kpi-grid compact">
        {[
          ["Total documents", "6,842", "blue"],
          ["Expiring soon", "42", "amber"],
          ["Expired", "7", "red"],
          ["Missing", "18", "violet"],
          ["Under review", "6", "teal"],
        ].map(([x, y, z]) => (
          <div className="mini-kpi" key={x}>
            <span>
              <i className={z} />
              {tr(x)}
            </span>
            <strong>{y}</strong>
          </div>
        ))}
      </div>

      <div className="document-grid">
        {docs
          .filter((d) => !d.archived)
          .map((d) => (
            <div className="panel document-card" key={d.id}>
              <div className="document-preview">
                <Icon name="file" size={38} />
                <Badge
                  tone={
                    d.status === "Valid"
                      ? "green"
                      : d.status === "Expired"
                      ? "red"
                      : "amber"
                  }
                >
                  {d.status}
                </Badge>
              </div>
              <div className="document-body">
                <span>
                  {tr(d.type)} · v{d.version}
                </span>
                <h3>{d.employee}</h3>
                <p>
                  {d.file} · {d.size} MB
                </p>
                <small>
                  {tr("Expires")} {d.expiry} · {tr("Uploaded by")} {d.uploadedBy}
                </small>
              </div>
              <div className="card-actions">
                <button onClick={() => setSelected(d)}>{tr("View")}</button>
                <button onClick={() => setEditing(d)}>{tr("Edit")}</button>
                <button
                  onClick={() => {
                    const blob = new Blob([`Prototype document: ${d.id}`]);
                    const a = document.createElement("a");
                    a.href = URL.createObjectURL(blob);
                    a.download = d.file || `${d.id}.pdf`;
                    a.click();
                  }}
                >
                  {tr("Download")}
                </button>
              </div>
            </div>
          ))}
      </div>

      {editing && (
        <div className="modal-backdrop" onMouseDown={() => setEditing(null)}>
          <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>
                  {editing.id ? tr("Edit metadata") : tr("Upload document")}
                </h2>
                <p>
                  {tr(
                    "Prototype storage only · PDF, PNG or JPG · maximum 10 MB"
                  )}
                </p>
              </div>
              <button className="icon-button" onClick={() => setEditing(null)}>
                ×
              </button>
            </div>
            <div className="form-grid">
              <label>
                {tr("Employee")}
                <select
                  value={editing.employee}
                  onChange={(e) =>
                    setEditing({ ...editing, employee: e.target.value })
                  }
                >
                  <option>Jordan Lee</option>
                  <option>Omar Benali</option>
                  <option>Sophie Laurent</option>
                </select>
              </label>
              <label>
                {tr("Document type")}
                <select
                  value={editing.type}
                  onChange={(e) =>
                    setEditing({ ...editing, type: e.target.value })
                  }
                >
                  <option>Contract</option>
                  <option>National ID</option>
                  <option>Insurance</option>
                  <option>Certificate</option>
                  <option>Passport</option>
                  <option>Medical</option>
                  <option>Work Permit</option>
                </select>
              </label>
              <label>
                {tr("Issue date")}
                <input
                  type="date"
                  value={editing.issue}
                  onChange={(e) =>
                    setEditing({ ...editing, issue: e.target.value })
                  }
                />
              </label>
              <label>
                {tr("Expiry date")}
                <input
                  type="date"
                  value={editing.expiry}
                  onChange={(e) =>
                    setEditing({ ...editing, expiry: e.target.value })
                  }
                />
              </label>
              <label className="span-two">
                {tr("File")}
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f)
                      setEditing({
                        ...editing,
                        file: f.name,
                        size: Number((f.size / 1048576).toFixed(1)),
                      });
                  }}
                />
              </label>
            </div>
            {message && (
              <div className="form-error">
                {tr(message)}{" "}
                <button onClick={() => setMessage("")}>{tr("Retry")}</button>
              </div>
            )}
            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() => setEditing(null)}
              >
                {tr("Cancel")}
              </button>
              <button className="primary-button" onClick={save}>
                {tr("Validate & save")}
              </button>
            </div>
          </div>
        </div>
      )}

      {selected && (
        <div className="drawer-backdrop" onMouseDown={() => setSelected(null)}>
          <div className="profile-drawer" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <div className="eyebrow">{tr("Document details")}</div>
                <h2>{tr(selected.type)}</h2>
                <p>
                  {selected.employee} · {selected.id}
                </p>
              </div>
              <button className="icon-button" onClick={() => setSelected(null)}>
                ×
              </button>
            </div>
            <div className="profile-body">
              <div className="document-viewer">
                <Icon name="file" size={64} />
                <span>{tr("Secure prototype preview")}</span>
                <small>
                  {tr("Raw file content is not uploaded to cloud storage.")}
                </small>
              </div>
              <div className="detail-grid">
                {[
                  ["Current version", `v${selected.version}`],
                  ["File", selected.file],
                  ["Issue date", selected.issue],
                  ["Expiry date", selected.expiry],
                  ["Status", selected.status],
                  ["Uploaded by", selected.uploadedBy],
                  ["Created at", "12 Jun 2021 · 14:20"],
                  ["Updated at", "Today · 10:42"],
                ].map(([a, b]) => (
                  <div key={a}>
                    <span>{tr(a)}</span>
                    <strong>{tr(b)}</strong>
                  </div>
                ))}
              </div>
              <h3>{tr("Version history")}</h3>
              <div className="version-list">
                {Array.from(
                  { length: selected.version },
                  (_, i) => selected.version - i
                ).map((v) => (
                  <div key={v}>
                    <span>
                      <Icon name="file" />
                      <strong>v{v}</strong>
                    </span>
                    <span>
                      {v === selected.version ? tr("Current") : tr("Archived version")} ·{" "}
                      Maya Chen
                    </span>
                    <button>{tr("Download")}</button>
                  </div>
                ))}
              </div>
              <div className="action-grid">
                <button onClick={() => replaceVersion(selected)}>
                  {tr("Replace version")}
                </button>
                <button
                  onClick={() => {
                    setDocs((all) =>
                      all.map((x) =>
                        x.id === selected.id ? { ...x, archived: true } : x
                      )
                    );
                    setSelected(null);
                  }}
                >
                  {tr("Archive")}
                </button>
                <button
                  onClick={() =>
                    window.confirm(
                      tr("Permanently delete this document and its versions?")
                    ) &&
                    (setDocs((all) => all.filter((x) => x.id !== selected.id)),
                    setSelected(null))
                  }
                >
                  {tr("Delete")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DocumentsCenterView;
