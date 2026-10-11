"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";

export function FleetToolbar({ placeholder, onQuery }: { placeholder: string; onQuery: (q: string) => void }) {
  const { tr } = useApp();
  const [query, setQuery] = useState("");
  return (
    <section className="panel inventory-toolbar-panel">
      <div className="finance-toolbar inventory-toolbar">
        <div className="search-field">
          <Icon name="search" size={14} />
          <input
            placeholder={tr(placeholder)}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onQuery(e.target.value);
            }}
          />
        </div>
        <button className="text-button" type="button">{tr("Filters")}</button>
        <button className="text-button" type="button">{tr("Date")}</button>
        <button className="text-button" type="button">{tr("Export")}</button>
      </div>
    </section>
  );
}

export default FleetToolbar;
