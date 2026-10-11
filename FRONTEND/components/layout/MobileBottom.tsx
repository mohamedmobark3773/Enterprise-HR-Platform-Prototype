"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import { Page } from "@/types";
import { navItems } from "@/lib/constants/navigation";

export function MobileBottom() {
  const { activePage, navigate, setMobileMenu, t } = useApp();

  const mobileNavPages: Page[] = ["dashboard", "employees", "attendance", "notifications"];

  return (
    <div className="mobile-bottom">
      {mobileNavPages.map((id) => {
        const item = navItems.find((n) => n.id === id);
        return (
          <button
            key={id}
            className={activePage === id ? "active" : ""}
            onClick={() => navigate(id)}
          >
            <Icon name={item?.icon || "grid"} />
            <span>{t[id]}</span>
          </button>
        );
      })}
      <button onClick={() => setMobileMenu(true)}>
        <Icon name="menu" />
        <span>{t.more}</span>
      </button>
    </div>
  );
}

export default MobileBottom;
