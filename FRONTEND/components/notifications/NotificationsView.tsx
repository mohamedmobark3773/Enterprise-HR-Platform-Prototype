"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { PageTitle } from "@/components/ui/PageTitle";
import { NotificationItem, initialNotifications } from "@/types/notifications";
import { useApp } from "@/lib/context/AppContext";

export function NotificationsView() {
  const [items, setItems] = useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [opened, setOpened] = useState<NotificationItem | null>(null);
  const { tr } = useApp();

  const visible = items.filter(
    (x) =>
      (filter === "All" || x.category === filter) &&
      (x.title + x.body).toLowerCase().includes(query.toLowerCase())
  );

  const open = (item: NotificationItem) => {
    setItems((all) =>
      all.map((x) => (x.id === item.id ? { ...x, read: true } : x))
    );
    setOpened(item);
  };

  return (
    <>
      <PageTitle
        title="Notifications"
        subtitle="Your centralized operational inbox"
        actions={
          <button
            className="secondary-button"
            onClick={() => setItems(items.map((x) => ({ ...x, read: true })))}
          >
            {tr("Mark all as read")}
          </button>
        }
      />

      <div className="notification-toolbar">
        <div className="search-field">
          <Icon name="search" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tr("Search notifications")}
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Filter notifications"
        >
          <option>{tr("All")}</option>
          {[
            "Attendance",
            "Leave",
            "Permissions",
            "Payroll",
            "Recruitment",
            "Documents",
            "Workflow",
            "AI",
            "System",
          ].map((x) => (
            <option key={x}>{tr(x)}</option>
          ))}
        </select>
        <button className="secondary-button" onClick={() => setFilter("All")}>
          {tr("Reset")}
        </button>
      </div>

      <div className="panel notification-list">
        {visible.map((x) => (
          <button
            className={x.read ? "" : "unread"}
            key={x.id}
            onClick={() => open(x)}
          >
            <span className="notification-icon">
              <Icon
                name={
                  x.category === "Payroll"
                    ? "wallet"
                    : x.category === "Attendance"
                    ? "scan"
                    : "bell"
                }
              />
            </span>
            <span>
              <strong>{tr(x.title)}</strong>
              <small>{tr(x.body)}</small>
              <em>
                {tr(x.category)} · {x.time} · {x.record}
              </em>
            </span>
            {!x.read && <i />}
          </button>
        ))}
        {visible.length === 0 && (
          <div className="empty-state">
            <Icon name="bell" />
            <h3>{tr("No notifications found")}</h3>
            <p>{tr("Change the search or category filter.")}</p>
          </div>
        )}
      </div>

      {opened && (
        <div className="modal-backdrop" onMouseDown={() => setOpened(null)}>
          <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <div className="eyebrow">{tr(opened.category)}</div>
                <h2>{tr(opened.title)}</h2>
                <p>
                  {opened.time} · {opened.record}
                </p>
              </div>
              <button className="icon-button" onClick={() => setOpened(null)}>
                ×
              </button>
            </div>
            <div className="notification-detail">
              <p>{tr(opened.body)}</p>
              <div className="insight-action">
                <span>{tr("Related record")}</span>
                <strong>
                  {opened.record} is available in the {tr(opened.category)} module.
                </strong>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() => setOpened(null)}
              >
                {tr("Close")}
              </button>
              <button className="primary-button">
                {tr("Open related record")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NotificationsView;
