"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { initialSkills } from "@/types/recruitment";
import { initialPredictions } from "@/lib/ai/ai-contracts";
import { useApp } from "@/lib/context/AppContext";

export interface CandidateDrawerProps {
  candidate: string;
  close: () => void;
}

export function CandidateDrawer({ candidate, close }: CandidateDrawerProps) {
  const { tr } = useApp();
  const matchPrediction = initialPredictions.find(
    (p) => p.sourceModule === "Recruitment"
  )!;

  return (
    <div className="drawer-backdrop" onMouseDown={close}>
      <div
        className="profile-drawer candidate-detail"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <div className="eyebrow">{tr("Candidate comparison")}</div>
            <h2>{candidate}</h2>
            <p>Senior QA Automation Engineer · CAN-284</p>
          </div>
          <button className="icon-button" onClick={close}>
            ×
          </button>
        </div>

        <div className="match-summary">
          {[
            ["Overall match", "84%"],
            ["Skills match", "78%"],
            ["Experience", "92%"],
            ["Education", "100%"],
            ["Certification", "70%"],
          ].map(([a, b]) => (
            <div key={a}>
              <span>{tr(a)}</span>
              <strong>{b}</strong>
            </div>
          ))}
        </div>

        <div className="profile-body">
          <div className="human-review">
            <Icon name="spark" />
            <div>
              <strong>{tr("Decision support only")}</strong>
              <span>
                {tr(
                  "This comparison cannot make or automate a hiring decision. Recruiter review is required."
                )}
              </span>
            </div>
          </div>

          <h3>{tr("Candidate vs job requirements")}</h3>
          <div className="skill-table">
            <div className="skill-row skill-head">
              <span>{tr("Skill")}</span>
              <span>{tr("Candidate")}</span>
              <span>{tr("Required")}</span>
              <span>{tr("Match")}</span>
              <span>{tr("Gap")}</span>
            </div>
            {initialSkills.map((r) => (
              <div className="skill-row" key={r[0]}>
                {r.map((x, i) => (
                  <span key={x}>
                    {i === 3 ? (
                      <Badge tone={x === "Missing" ? "red" : "green"}>{x}</Badge>
                    ) : (
                      tr(x)
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="comparison-grid">
            <div className="panel">
              <h3>{tr("Why the candidate matches")}</h3>
              <p>
                {tr(
                  "Five years of automation experience, advanced Selenium and Java evidence, plus strong API testing projects."
                )}
              </p>
            </div>
            <div className="panel">
              <h3>{tr("Missing requirements")}</h3>
              <p>
                {tr(
                  "No demonstrated performance testing experience and certification evidence needs validation."
                )}
              </p>
            </div>
          </div>

          <div className="insight-action">
            <span>
              {tr("Recommended human review")} ·{" "}
              {Math.round(matchPrediction.confidence * 100)}% {tr("Confidence")}
            </span>
            <strong>{matchPrediction.recommendedAction}</strong>
          </div>

          <div className="modal-actions">
            <button className="secondary-button" onClick={close}>
              {tr("Reject with reason")}
            </button>
            <button className="primary-button" onClick={close}>
              {tr("Move to technical interview")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDrawer;
