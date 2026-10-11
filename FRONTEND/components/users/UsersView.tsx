"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { PageTitle } from "@/components/ui/PageTitle";
import { SimpleTable } from "@/components/ui/SimpleTable";
import { useApp } from "@/lib/context/AppContext";
import { listUsers, PlatformUser } from "@/lib/services/users";

export function UsersView() {
  const { tr } = useApp();
  const [users, setUsers] = useState<PlatformUser[] | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    listUsers().then(setUsers);
  }, []);

  const filtered = (users || []).filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase()) ||
      u.role.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageTitle
        eyebrow="Administration"
        title="User Management"
        subtitle="Manage platform users, roles and access status"
        actions={
          <button className="primary-button">
            <Icon name="plus" /> {tr("Invite user")}
          </button>
        }
      />
      <div className="table-toolbar" style={{ borderBottom: 0, paddingInline: 0 }}>
        <div className="search-field">
          <Icon name="search" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={tr("Search users")} aria-label={tr("Search users")} />
        </div>
      </div>
      {users === null ? (
        <div className="panel empty-state"><p>{tr("Loading users…")}</p></div>
      ) : filtered.length === 0 ? (
        <div className="panel empty-state"><h3>{tr("No users found")}</h3><p>{tr("Try a different search.")}</p></div>
      ) : (
        <SimpleTable
          title="Users"
          columns={["Name", "Email", "Role", "Last seen", "Status"]}
          rows={filtered.map((u) => [u.name, u.email, u.role, u.lastSeen, u.status])}
        />
      )}
    </>
  );
}

export default UsersView;
