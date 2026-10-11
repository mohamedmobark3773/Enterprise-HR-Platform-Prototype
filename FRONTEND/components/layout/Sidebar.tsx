"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { useApp } from "@/lib/context/AppContext";
import { navGroups, navItems, type NavGroup } from "@/lib/constants/navigation";

function activeChildForGroup(group: NavGroup, pathname: string) {
  return (
    group.children
      .filter(
        (child) =>
          child.path === pathname ||
          (child.path !== group.overview && pathname.startsWith(`${child.path}/`))
      )
      .sort((a, b) => b.path.length - a.path.length)[0] ?? null
  );
}

function groupForPath(pathname: string): NavGroup | undefined {
  return navGroups.find((group) => activeChildForGroup(group, pathname) !== null);
}

export function Sidebar() {
  const { collapsed, setCollapsed, mobileMenu, activePage, navigate, navigatePath, t, tr } =
    useApp();
  const pathname = usePathname();

  const [openGroups, setOpenGroups] = useState<string[]>(() => {
    const active = groupForPath(pathname);
    return active ? [active.id] : [navGroups[0].id];
  });

  useEffect(() => {
    const active = groupForPath(pathname);
    if (active) {
      setOpenGroups((prev) => (prev.includes(active.id) ? prev : [...prev, active.id]));
    }
  }, [pathname]);

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
  };

  const legacyAi = navItems.find((n) => n.id === "ai");

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileMenu ? "mobile-open" : ""}`}>
      <div className="brand">
        <div className="brand-mark">
          <span>N</span>
        </div>
        {!collapsed && (
          <div>
            <strong>NEXUS</strong>
            <small>CORE</small>
          </div>
        )}
        <button
          className="icon-button collapse"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Collapse navigation"
        >
          <Icon name="chevron" />
        </button>
      </div>

      <nav className="nav-list">
        {navGroups.map((group) => {
          const activeChild = activeChildForGroup(group, pathname);
          const isOpen = openGroups.includes(group.id);
          if (collapsed) {
            return (
              <div key={group.id}>
                <Link
                  href={group.overview}
                  className={`nav-item ${activeChild ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigatePath(group.overview);
                  }}
                  title={tr(group.label)}
                >
                  <Icon name={group.icon} />
                </Link>
              </div>
            );
          }
          return (
            <div key={group.id} className="nav-group">
              <button
                type="button"
                className={`nav-item nav-group-header ${activeChild ? "active" : ""}`}
                aria-expanded={isOpen}
                onClick={() => toggleGroup(group.id)}
                title={tr(group.label)}
              >
                <Icon name={group.icon} />
                <span>{tr(group.label)}</span>
                <Icon
                  name="chevron"
                  size={14}
                  className={`nav-group-chevron ${isOpen ? "open" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="nav-group-children">
                  {group.children.map((child) => {
                    const isActive = activeChild?.path === child.path;
                    return (
                      <Link
                        key={child.path}
                        href={child.path}
                        className={`nav-item child ${isActive ? "active" : ""}`}
                        aria-current={isActive ? "page" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          if (child.id) navigate(child.id);
                          else navigatePath(child.path);
                        }}
                        title={child.id ? t[child.id] : tr(child.label ?? child.path)}
                      >
                        {!collapsed && (
                          <span>{child.id ? t[child.id] : tr(child.label ?? child.path)}</span>
                        )}
                        {child.id === "notifications" && <em>5</em>}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        {legacyAi && (
          <div>
            {!collapsed && <div className="nav-separator" />}
            <Link
              href={legacyAi.path}
              className={`nav-item ${activePage === legacyAi.id ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(legacyAi.id);
              }}
              title={t[legacyAi.id]}
            >
              <Icon name={legacyAi.icon} />
              {!collapsed && <span>{t[legacyAi.id]}</span>}
            </Link>
          </div>
        )}
      </nav>

      <div className="sidebar-profile">
        <div className="avatar avatar-indigo">MC</div>
        {!collapsed && (
          <div>
            <strong>Maya Chen</strong>
            <small>{tr("HR Director")}</small>
          </div>
        )}
        {!collapsed && <Icon name="dots" />}
      </div>
    </aside>
  );
}

export default Sidebar;
