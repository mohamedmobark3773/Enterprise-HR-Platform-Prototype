"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { AttendanceIntelligence } from "@/components/attendance/AttendanceIntelligence";
import { useApp } from "@/lib/context/AppContext";
import { initialAttendanceRecords } from "@/types/attendance";

export interface AttendanceViewProps {
  defaultTab?: string;
}

export function AttendanceView({ defaultTab = "Records" }: AttendanceViewProps) {
  const [tab, setTab] = useState(defaultTab);
  const { navigate, tr } = useApp();

  const tabs = [
    "Dashboard",
    "Records",
    "Details",
    "Corrections",
    "Exceptions",
    "Work shifts",
    "Devices",
    "Intelligence",
    "Reports",
  ];
  const prototypeTabs = [
    "Dashboard",
    "Details",
    "Corrections",
    "Exceptions",
    "Work shifts",
    "Devices",
    "Reports",
  ];

  return (
    <>
      <PageTitle
        eyebrow="Time & workforce"
        title="Attendance"
        subtitle="Live attendance operations across every branch"
        actions={
          <>
            <button className="secondary-button" onClick={() => window.print()}>
              <Icon name="download" /> {tr("Download report")}
            </button>
            <button className="primary-button" onClick={() => navigate("face")}>
              <Icon name="scan" /> {tr("Open face terminal")}
            </button>
          </>
        }
      />

      <div className="tabs">
        {tabs.map((x) => (
          <button
            key={x}
            className={tab === x ? "active" : ""}
            onClick={() => setTab(x)}
          >
            {tr(x)}
          </button>
        ))}
      </div>

      <div className="kpi-grid compact">
        {[
          ["Present", "1,103", "green"],
          ["Late", "67", "amber"],
          ["Absent", "31", "red"],
          ["On leave", "47", "blue"],
          ["Remote", "126", "violet"],
          ["Overtime", "92h", "teal"],
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

      {tab === "Intelligence" ? (
        <AttendanceIntelligence />
      ) : prototypeTabs.includes(tab) ? (
        <div className="panel empty-state">
          <Icon name="clock" size={32} />
          <h3>{tr(tab)}</h3>
          <p>{tr("This attendance prototype surface is ready for connected data and workflows.")}</p>
          <span className="badge badge-neutral">{tr("Prototype only")}</span>
        </div>
      ) : (
        <div className="panel table-panel">
          <div className="table-toolbar">
            <div className="search-field">
              <Icon name="search" />
              <input placeholder={tr("Search attendance records")} />
            </div>
            <input type="date" defaultValue="2025-03-14" aria-label="Attendance date" />
            <select aria-label="Attendance method">
              <option>{tr("All methods")}</option>
              <option>{tr("Face Recognition")}</option>
              <option>{tr("Mobile Face")}</option>
              <option>GPS</option>
            </select>
          </div>

          <div className="data-table attendance-table">
            <div className="tr th">
              <span>{tr("Employee")}</span>
              <span>{tr("Check-in")}</span>
              <span>{tr("Check-out")}</span>
              <span>{tr("Worked")}</span>
              <span>{tr("Method")}</span>
              <span>{tr("Verification")}</span>
              <span />
            </div>

            {initialAttendanceRecords.map((record) => (
              <div className="tr" key={record.name}>
                <span className="employee-cell">
                  <span className="avatar avatar-indigo">{record.initials}</span>
                  <strong>{record.name}</strong>
                </span>
                <span data-label={tr("Check-in")}>{record.checkIn}</span>
                <span data-label={tr("Check-out")}>{record.checkOut}</span>
                <span data-label={tr("Worked")}>{record.worked}</span>
                <span data-label={tr("Method")}>{tr(record.method)}</span>
                <span>
                  <Badge tone={record.tone}>{record.verification}</Badge>
                </span>
                <button className="icon-button" aria-label="Attendance options">
                  <Icon name="dots" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default AttendanceView;
