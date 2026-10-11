"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { PageTitle } from "@/components/ui/PageTitle";
import { SimpleTable } from "@/components/ui/SimpleTable";
import { useApp } from "@/lib/context/AppContext";
import { listBranches, Branch } from "@/lib/services/branches";

export function BranchesView() {
  const { tr } = useApp();
  const [branches, setBranches] = useState<Branch[] | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    listBranches().then(setBranches);
  }, []);

  const filtered = (branches || []).filter(
    (b) =>
      b.name.toLowerCase().includes(query.toLowerCase()) ||
      b.code.toLowerCase().includes(query.toLowerCase()) ||
      b.city.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageTitle
        eyebrow="Organization"
        title="Branches"
        subtitle="Operational branches, cities and site coverage"
        actions={
          <button className="primary-button">
            <Icon name="plus" /> {tr("Add branch")}
          </button>
        }
      />
      <div className="table-toolbar" style={{ borderBottom: 0, paddingInline: 0 }}>
        <div className="search-field">
          <Icon name="search" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={tr("Search branches")} aria-label={tr("Search branches")} />
        </div>
      </div>
      {branches === null ? (
        <div className="panel empty-state"><p>{tr("Loading branches…")}</p></div>
      ) : filtered.length === 0 ? (
        <div className="panel empty-state"><h3>{tr("No branches found")}</h3><p>{tr("Try a different search.")}</p></div>
      ) : (
        <SimpleTable
          title="Branches"
          columns={["Branch", "Code", "City", "Manager", "Sites", "Status"]}
          rows={filtered.map((b) => [b.name, b.code, b.city, b.manager, String(b.sites), b.status])}
        />
      )}
    </>
  );
}

export default BranchesView;
