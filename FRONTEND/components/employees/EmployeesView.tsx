"use client";

import React, { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { EmployeeProfileDrawer } from "@/components/employees/EmployeeProfileDrawer";
import { Employee, initialEmployees } from "@/types/employee";
import { useApp } from "@/lib/context/AppContext";

export function EmployeesView() {
  const { tr } = useApp();
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All departments");
  const [selected, setSelected] = useState<string[]>([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [modal, setModal] = useState<"add" | "profile" | null>(null);
  const [profile, setProfile] = useState<Employee | null>(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    dept: "Engineering",
    branch: "London HQ",
  });

  const filtered = useMemo(
    () =>
      employees
        .filter(
          (e) =>
            (e.name.toLowerCase().includes(query.toLowerCase()) ||
              e.id.toLowerCase().includes(query.toLowerCase())) &&
            (dept === "All departments" || e.dept === dept)
        )
        .sort((a, b) =>
          sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        ),
    [employees, query, dept, sortAsc]
  );

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const archive = () => {
    setEmployees((all) =>
      all.map((e) => (selected.includes(e.id) ? { ...e, status: "Archived" } : e))
    );
    setSelected([]);
  };

  const add = () => {
    if (!form.name || !form.role) return;
    setEmployees((all) => [
      {
        id: `NX-${1050 + all.length}`,
        name: form.name,
        role: form.role,
        dept: form.dept,
        branch: form.branch,
        manager: "Maya Chen",
        status: "Active",
        attendance: "Present",
        initials: form.name
          .split(" ")
          .map((x) => x[0])
          .join("")
          .slice(0, 2),
        color: "indigo",
      },
      ...all,
    ]);
    setModal(null);
    setForm({ name: "", role: "", dept: "Engineering", branch: "London HQ" });
  };

  return (
    <>
      <PageTitle
        eyebrow="People directory"
        title="Employees"
        subtitle={`${
          employees.filter((e) => e.status !== "Archived").length
        } active employees across 6 locations`}
        actions={
          <>
            <button className="secondary-button" onClick={() => window.print()}>
              <Icon name="download" /> {tr("Export")}
            </button>
            <button className="primary-button" onClick={() => setModal("add")}>
              <Icon name="plus" /> {tr("Add employee")}
            </button>
          </>
        }
      />

      <div className="panel table-panel">
        <div className="table-toolbar">
          <div className="search-field">
            <Icon name="search" />
            <input
              placeholder={tr("Search by name or employee ID")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            aria-label="Filter by department"
          >
            <option>{tr("All departments")}</option>
            <option>{tr("Engineering")}</option>
            <option>{tr("Product")}</option>
            <option>{tr("People")}</option>
            <option>{tr("Finance")}</option>
            <option>{tr("Sales")}</option>
          </select>
          <select aria-label="Filter by status">
            <option>{tr("All statuses")}</option>
            <option>{tr("Active")}</option>
            <option>{tr("On leave")}</option>
          </select>
          <button className="icon-button" aria-label="More filters">
            <Icon name="dots" />
          </button>
        </div>

        {selected.length > 0 && (
          <div className="bulk-bar">
            <strong>
              {selected.length} {tr("selected")}
            </strong>
            <button onClick={archive}>{tr("Archive")}</button>
            <button onClick={() => setSelected([])}>{tr("Clear")}</button>
          </div>
        )}

        <div className="data-table employee-table">
          <div className="tr th">
            <span>
              <input
                type="checkbox"
                checked={selected.length === filtered.length && filtered.length > 0}
                onChange={() =>
                  setSelected(
                    selected.length === filtered.length ? [] : filtered.map((e) => e.id)
                  )
                }
                aria-label="Select all employees"
              />
            </span>
            <button onClick={() => setSortAsc(!sortAsc)}>
              {tr("Employee")} <span>{sortAsc ? "↑" : "↓"}</span>
            </button>
            <span>{tr("Department")}</span>
            <span>{tr("Branch")}</span>
            <span>{tr("Manager")}</span>
            <span>{tr("Status")}</span>
            <span>{tr("Attendance")}</span>
            <span />
          </div>

          {filtered.map((e) => (
            <div className="tr" key={e.id}>
              <span>
                <input
                  type="checkbox"
                  checked={selected.includes(e.id)}
                  onChange={() => toggle(e.id)}
                  aria-label={`Select ${e.name}`}
                />
              </span>
              <button
                className="employee-cell"
                onClick={() => {
                  setProfile(e);
                  setModal("profile");
                }}
              >
                <span className={`avatar avatar-${e.color}`}>{e.initials}</span>
                <span>
                  <strong>{e.name}</strong>
                  <small>
                    {e.id} · {e.role}
                  </small>
                </span>
              </button>
              <span data-label={tr("Department")}>{tr(e.dept)}</span>
              <span data-label={tr("Branch")}>{tr(e.branch)}</span>
              <span data-label={tr("Manager")}>{e.manager}</span>
              <span>
                <Badge
                  tone={
                    e.status === "Active"
                      ? "green"
                      : e.status === "Archived"
                      ? "neutral"
                      : "blue"
                  }
                >
                  {e.status}
                </Badge>
              </span>
              <span>
                <Badge
                  tone={
                    e.attendance === "Present"
                      ? "green"
                      : e.attendance === "Late"
                      ? "amber"
                      : e.attendance === "Absent"
                      ? "red"
                      : "blue"
                  }
                >
                  {e.attendance}
                </Badge>
              </span>
              <button
                className="icon-button"
                onClick={() => {
                  setProfile(e);
                  setModal("profile");
                }}
                aria-label="View actions"
              >
                <Icon name="dots" />
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="empty-state">
              <Icon name="search" size={32} />
              <h3>{tr("No employees found")}</h3>
              <p>{tr("Try changing your search or filters.")}</p>
            </div>
          )}
        </div>

        <div className="pagination">
          <span>
            {tr("Showing")} 1–{filtered.length} {tr("of")} {filtered.length}
          </span>
          <div>
            <button disabled>{tr("Previous")}</button>
            <button className="active">1</button>
            <button>{tr("Next")}</button>
          </div>
        </div>
      </div>

      {modal === "add" && (
        <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
          <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>{tr("Add employee")}</h2>
                <p>{tr("Create a new employee record.")}</p>
              </div>
              <button className="icon-button" onClick={() => setModal(null)}>
                ×
              </button>
            </div>
            <div className="form-grid">
              <label>
                {tr("Full name")}
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                />
              </label>
              <label>
                {tr("Position")}
                <input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g. Product Manager"
                />
              </label>
              <label>
                {tr("Department")}
                <select
                  value={form.dept}
                  onChange={(e) => setForm({ ...form, dept: e.target.value })}
                >
                  <option>Engineering</option>
                  <option>Product</option>
                  <option>People</option>
                  <option>Finance</option>
                </select>
              </label>
              <label>
                {tr("Branch")}
                <select
                  value={form.branch}
                  onChange={(e) => setForm({ ...form, branch: e.target.value })}
                >
                  <option>London HQ</option>
                  <option>Paris</option>
                  <option>Cairo</option>
                  <option>Milan</option>
                </select>
              </label>
            </div>
            <div className="modal-actions">
              <button className="secondary-button" onClick={() => setModal(null)}>
                {tr("Cancel")}
              </button>
              <button
                className="primary-button"
                disabled={!form.name || !form.role}
                onClick={add}
              >
                {tr("Create employee")}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === "profile" && profile && (
        <EmployeeProfileDrawer
          employee={profile}
          close={() => {
            setModal(null);
            setProfile(null);
          }}
        />
      )}
    </>
  );
}

export default EmployeesView;
