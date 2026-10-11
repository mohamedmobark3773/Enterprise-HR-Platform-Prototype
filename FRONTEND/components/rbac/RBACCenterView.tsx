"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { permissionActions, roleNames, rbacModules } from "@/types/rbac";
import { useApp } from "@/lib/context/AppContext";

export function RBACCenterView() {
  const [role, setRole] = useState<string>("HR Specialist");
  const { tr } = useApp();

  const [matrix, setMatrix] = useState<Record<string, boolean>>(() => {
    const values: Record<string, boolean> = {};
    rbacModules.forEach((m, mi) =>
      permissionActions.forEach(
        (a) =>
          (values[`${role}:${m}:${a}`] =
            a === "View" ||
            a === "Export" ||
            (mi < 5 && ["Create", "Edit"].includes(a)) ||
            (a === "Approve" && ["Leave", "Permissions", "Workflows"].includes(m)) ||
            (a === "Print" && mi < 8))
      )
    );
    return values;
  });

  const allowed = (module: string, action: string) =>
    matrix[`${role}:${module}:${action}`] ?? role === "Super Admin";

  const toggle = (module: string, action: string) =>
    setMatrix((all) => ({
      ...all,
      [`${role}:${module}:${action}`]: !allowed(module, action),
    }));

  return (
    <>
      <PageTitle
        eyebrow="Security administration"
        title="Roles & Permission Matrix"
        subtitle="Module, screen and action-level access control"
        actions={
          <button className="primary-button">
            <Icon name="plus" /> {tr("Create role")}
          </button>
        }
      />

      <div className="role-layout">
        <aside className="panel role-list">
          <div className="panel-head">
            <div>
              <h2>{tr("Roles")}</h2>
              <p>8 {tr("system roles")}</p>
            </div>
          </div>
          {roleNames.map((r) => (
            <button
              className={role === r ? "active" : ""}
              onClick={() => setRole(r)}
              key={r}
            >
              <span className="role-avatar">
                <Icon name={r === "Employee" ? "user" : "shield"} />
              </span>
              <span>
                <strong>{tr(r)}</strong>
                <small>
                  {r === "Employee"
                    ? "1,148 users"
                    : r === "Manager"
                    ? "96 users"
                    : "12 users"}
                </small>
              </span>
            </button>
          ))}
        </aside>

        <section className="panel matrix-panel">
          <div className="panel-head">
            <div>
              <h2>{tr(role)}</h2>
              <p>
                {tr(
                  "Changes apply immediately to the prototype access preview"
                )}
              </p>
            </div>
            <Badge tone={role === "Super Admin" ? "red" : "blue"}>
              {role === "Super Admin" ? "Full access" : "Custom role"}
            </Badge>
          </div>

          <div className="matrix-scroll">
            <div className="permission-matrix matrix-head">
              <span>{tr("Module / screen")}</span>
              {permissionActions.map((a) => (
                <span key={a}>{tr(a)}</span>
              ))}
            </div>
            {rbacModules.map((m) => (
              <div className="permission-matrix" key={m}>
                <strong>{tr(m)}</strong>
                {permissionActions.map((a) => (
                  <label key={a} title={`${role}: ${a} ${m}`}>
                    <input
                      type="checkbox"
                      checked={allowed(m, a)}
                      disabled={role === "Super Admin"}
                      onChange={() => toggle(m, a)}
                    />
                    <span>
                      <Icon name="check" />
                    </span>
                  </label>
                ))}
              </div>
            ))}
          </div>

          <div className="access-preview">
            <div>
              <strong>{tr("Access preview")}</strong>
              <span>
                {tr("Visible actions for")} {tr(role)} {tr("in Employees")}
              </span>
            </div>
            {permissionActions
              .filter((a) => allowed("Employees", a))
              .map((a) => (
                <button key={a} className={a === "Delete" ? "danger" : ""}>
                  {tr(a)}
                </button>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default RBACCenterView;
