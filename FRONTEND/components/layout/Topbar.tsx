"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import { Locale } from "@/types";

export function Topbar() {
  const {
    mobileMenu,
    setMobileMenu,
    globalSearch,
    setGlobalSearch,
    locale,
    setLocale,
    dark,
    setDark,
    navigate,
    t,
  } = useApp();

  return (
    <header className="topbar">
      <button
        className="icon-button mobile-menu"
        onClick={() => setMobileMenu(!mobileMenu)}
        aria-label="Menu"
      >
        <Icon name="menu" />
      </button>

      <div className="global-search">
        <Icon name="search" />
        <input
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          placeholder={t.search}
          aria-label="Global search"
        />
        <kbd>⌘ K</kbd>
      </div>

      <div className="top-actions">
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          aria-label="Language selector"
        >
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="ar">AR</option>
        </select>

        <button
          className="icon-button"
          onClick={() => setDark(!dark)}
          aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
        >
          <Icon name={dark ? "sun" : "moon"} />
        </button>

        <button
          className="icon-button notification-button"
          onClick={() => navigate("notifications")}
          aria-label="Notifications"
        >
          <Icon name="bell" />
          <span />
        </button>

        <div className="top-avatar avatar avatar-indigo">MC</div>
      </div>
    </header>
  );
}

export default Topbar;
