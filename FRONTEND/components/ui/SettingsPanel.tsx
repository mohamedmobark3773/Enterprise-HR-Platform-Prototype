"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/lib/context/AppContext";

export interface SettingsPanelProps {
  biometric?: boolean;
}

export function SettingsPanel({ biometric = false }: SettingsPanelProps) {
  const [saved, setSaved] = useState(false);
  const { tr } = useApp();

  const settingsList = biometric
    ? [
        ["Liveness verification", "Required for every attendance attempt"],
        ["Verification threshold", "Minimum face match confidence: 92%"],
        ["Failed attempt policy", "Offer alternative after 3 attempts"],
        ["Template retention", "Delete 30 days after employment ends"],
        ["Manual review", "Required for confidence below 92%"],
      ]
    : [
        ["Multi-factor authentication", "Required for admin and payroll roles"],
        ["Session timeout", "30 minutes of inactivity"],
        ["Employee data export", "HR Admin and Auditor only"],
        ["Audit retention", "7 years"],
      ];

  return (
    <div className="panel settings-panel">
      <div className="panel-head">
        <div>
          <h2>{biometric ? tr("Face recognition settings") : tr("Security & access")}</h2>
          <p>
            {biometric
              ? tr("Access-controlled biometric policy configuration")
              : tr("Role-based permissions and platform security")}
          </p>
        </div>
        <Badge tone="violet">Restricted</Badge>
      </div>
      <div className="setting-list">
        {settingsList.map(([a, b], i) => (
          <div key={a}>
            <div>
              <strong>{tr(a)}</strong>
              <span>{tr(b)}</span>
            </div>
            <label className="switch">
              <input type="checkbox" defaultChecked={i !== 3} />
              <span />
            </label>
          </div>
        ))}
      </div>
      <div className="modal-actions">
        {saved && <Badge tone="green">{tr("Settings saved")}</Badge>}
        <button className="primary-button" onClick={() => setSaved(true)}>
          {tr("Save changes")}
        </button>
      </div>
    </div>
  );
}

export default SettingsPanel;
