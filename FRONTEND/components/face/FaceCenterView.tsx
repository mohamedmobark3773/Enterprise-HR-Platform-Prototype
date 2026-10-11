"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { SimpleTable } from "@/components/ui/SimpleTable";
import { SettingsPanel } from "@/components/ui/SettingsPanel";
import { useApp } from "@/lib/context/AppContext";

export interface FaceCenterViewProps {
  initialTab?: string;
}

export function FaceCenterView({ initialTab = "Terminal" }: FaceCenterViewProps) {
  const [tab, setTab] = useState(initialTab);
  const [stage, setStage] = useState<
    | "idle"
    | "detecting"
    | "liveness"
    | "success"
    | "failed"
    | "notDetected"
    | "multiple"
    | "unknown"
    | "cameraError"
    | "timeout"
  >("idle");
  const [enrollStep, setEnrollStep] = useState(0);
  const { tr } = useApp();

  const run = () => {
    setStage("detecting");
    setTimeout(() => setStage("liveness"), 900);
    setTimeout(() => setStage("success"), 1900);
  };

  const tabs = ["Terminal", "Enrollment", "Verification logs", "Failures", "Settings"];

  const instructionMap: Record<string, string> = {
    idle: "Position your face within the frame",
    detecting: "Face detected · Hold still",
    liveness: "Blink naturally",
    success: "Identity verified",
    failed: "Liveness failed · Alternative available",
    notDetected: "Face not detected · Move closer",
    multiple: "Multiple faces detected · One person only",
    unknown: "Unknown person · Manual review available",
    cameraError: "Camera error · Check device connection",
    timeout: "Verification timed out · Try again",
  };

  return (
    <>
      <PageTitle
        eyebrow="Biometric attendance"
        title="Face Recognition"
        subtitle="Secure, consent-based attendance verification with liveness detection"
        actions={<Badge tone="green">3 devices online</Badge>}
      />

      <div className="privacy-notice">
        <Icon name="shield" />
        <div>
          <strong>{tr("Privacy-first biometric processing")}</strong>
          <span>
            {tr(
              "Only encrypted face templates are retained. Raw capture data is not exposed. Alternative verification is always available."
            )}
          </span>
        </div>
        <button>{tr("View policy")}</button>
      </div>

      <div className="tabs">
        {tabs.map((x) => (
          <button
            className={tab === x ? "active" : ""}
            onClick={() => setTab(x)}
            key={x}
          >
            {tr(x)}
          </button>
        ))}
      </div>

      {tab === "Terminal" && (
        <div className="face-layout">
          <section className="camera-panel">
            <div className="camera-top">
              <span>
                <i className="live-dot" /> Terminal 03 · London HQ
              </span>
              <span>14 Mar · 09:01:42</span>
            </div>
            <div className={`camera-view ${stage}`}>
              <div className="camera-grid" />
              <div className="face-silhouette">
                <div className="head" />
                <div className="shoulders" />
              </div>
              {(stage === "detecting" || stage === "liveness" || stage === "success") && (
                <div className="face-box">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              )}
              <div className="camera-instruction">
                {tr(instructionMap[stage] || "Position your face within the frame")}
              </div>
            </div>
            <div className="camera-actions">
              <select
                className="state-select"
                value={stage}
                onChange={(e) => setStage(e.target.value as typeof stage)}
                aria-label="Simulation stage"
              >
                <option value="idle">{tr("Ready state")}</option>
                <option value="notDetected">{tr("Face not detected")}</option>
                <option value="multiple">{tr("Multiple faces")}</option>
                <option value="failed">{tr("Liveness failed")}</option>
                <option value="unknown">{tr("Unknown person")}</option>
                <option value="cameraError">{tr("Camera error")}</option>
                <option value="timeout">{tr("Timeout")}</option>
              </select>
              <button
                className="secondary-button"
                onClick={() => setStage("failed")}
              >
                {tr("Use alternative method")}
              </button>
              <button
                className="primary-button"
                onClick={run}
                disabled={stage === "detecting" || stage === "liveness"}
              >
                <Icon name="scan" />{" "}
                {stage === "idle" || stage !== "success"
                  ? tr("Start verification")
                  : tr("Verify again")}
              </button>
            </div>
          </section>

          <section className="verification-panel panel">
            <div className="panel-head">
              <div>
                <h2>{tr("Verification")}</h2>
                <p>{tr("Real-time workflow status")}</p>
              </div>
              <Badge
                tone={
                  stage === "success"
                    ? "green"
                    : stage === "failed"
                    ? "red"
                    : "blue"
                }
              >
                {stage === "success"
                  ? "Verified"
                  : stage === "failed"
                  ? "Review required"
                  : "Ready"}
              </Badge>
            </div>
            <div className="verify-steps">
              {[
                ["Face detection", stage !== "idle"],
                ["Liveness check", ["liveness", "success"].includes(stage)],
                ["Face recognition", stage === "success"],
                ["Location validation", stage === "success"],
                ["Attendance recorded", stage === "success"],
              ].map(([x, done], i) => (
                <div className={done ? "done" : ""} key={x as string}>
                  <span>{done ? <Icon name="check" /> : i + 1}</span>
                  <div>
                    <strong>{tr(x as string)}</strong>
                    <small>{done ? tr("Passed") : tr("Waiting")}</small>
                  </div>
                </div>
              ))}
            </div>
            {stage === "success" && (
              <div className="identity-card">
                <div className="avatar avatar-indigo">JL</div>
                <div>
                  <strong>Jordan Lee</strong>
                  <span>NX-1042 · Product</span>
                </div>
                <strong>
                  98.7%
                  <small>{tr("Face match")}</small>
                </strong>
              </div>
            )}
            {!["idle", "detecting", "liveness", "success"].includes(stage) && (
              <div className="failure-card">
                <strong>{tr("Verification not completed")}</strong>
                <p>
                  {tr(
                    "No attendance decision was made. The event is auditable and the employee may retry, request manual review, or use an approved alternative."
                  )}
                </p>
                <button
                  className="secondary-button"
                  onClick={() => setStage("idle")}
                >
                  {tr("Return to camera")}
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {tab === "Enrollment" && (
        <div className="panel enrollment">
          <div className="stepper">
            {[
              "Employee",
              "Consent",
              "Capture",
              "Liveness",
              "Angles",
              "Complete",
            ].map((x, i) => (
              <div className={i <= enrollStep ? "active" : ""} key={x}>
                <span>{i < enrollStep ? <Icon name="check" /> : i + 1}</span>
                <small>{tr(x)}</small>
              </div>
            ))}
          </div>
          <div className="enroll-content">
            <div className="enroll-visual">
              <Icon
                name={
                  enrollStep < 2
                    ? "user"
                    : enrollStep === 5
                    ? "check"
                    : "scan"
                }
                size={72}
              />
            </div>
            <div>
              <Badge tone="blue">
                {tr(`Step ${enrollStep + 1} of 6`)}
              </Badge>
              <h2>
                {tr(
                  [
                    "Select employee",
                    "Consent & acknowledgement",
                    "Capture face",
                    "Liveness verification",
                    "Capture multiple angles",
                    "Enrollment complete",
                  ][enrollStep]
                )}
              </h2>
              <p>
                {tr(
                  [
                    "Choose an employee with no active face template.",
                    "Confirm employee consent and review the retention policy.",
                    "Center the employee's face. Raw images are discarded after template creation.",
                    "Ask the employee to blink and turn slightly.",
                    "Capture front, left, right, up and down angles.",
                    "Encrypted face template created successfully.",
                  ][enrollStep]
                )}
              </p>
              {enrollStep === 1 && (
                <label className="consent">
                  <input type="checkbox" defaultChecked />{" "}
                  {tr(
                    "I confirm that the employee has reviewed and accepted the biometric enrollment policy."
                  )}
                </label>
              )}
              <div className="modal-actions">
                <button
                  className="secondary-button"
                  disabled={enrollStep === 0}
                  onClick={() => setEnrollStep(enrollStep - 1)}
                >
                  {tr("Back")}
                </button>
                <button
                  className="primary-button"
                  onClick={() => setEnrollStep(Math.min(5, enrollStep + 1))}
                >
                  {enrollStep === 5 ? tr("Done") : tr("Continue")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "Verification logs" && (
        <SimpleTable
          title="Verification log"
          columns={["Employee", "Timestamp", "Device", "Confidence", "Liveness", "Result"]}
          rows={[
            ["Jordan Lee", "Today 09:01", "Terminal 03", "98.7%", "Passed", "Verified"],
            ["Amira Hassan", "Today 08:58", "Mobile iOS", "96.2%", "Passed", "Verified"],
            ["Unknown person", "Today 08:51", "Terminal 01", "42.1%", "Passed", "Review required"],
            ["Noah Williams", "Yesterday 17:33", "Terminal 03", "—", "Failed", "Rejected"],
          ]}
        />
      )}

      {tab === "Failures" && (
        <SimpleTable
          title="Failures requiring review"
          columns={["Reference", "Timestamp", "Device", "Reason", "Attempts", "Status"]}
          rows={[
            ["VF-8821", "Today 08:51", "Terminal 01", "Unknown person", "2", "Review required"],
            ["VF-8814", "Yesterday 17:33", "Terminal 03", "Liveness failed", "1", "Rejected"],
            ["VF-8798", "Yesterday 09:12", "Mobile Android", "Location mismatch", "3", "Review required"],
          ]}
        />
      )}

      {tab === "Settings" && <SettingsPanel biometric />}
    </>
  );
}

export default FaceCenterView;
