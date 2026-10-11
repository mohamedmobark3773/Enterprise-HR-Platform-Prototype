"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/ui/PageTitle";
import { CandidateDrawer } from "@/components/recruitment/CandidateDrawer";
import { initialPipelineStages } from "@/types/recruitment";
import { useApp } from "@/lib/context/AppContext";

export function RecruitmentView() {
  const [tab, setTab] = useState("Pipeline");
  const [candidate, setCandidate] = useState<string | null>(null);
  const { tr } = useApp();

  const tabs = [
    "Dashboard",
    "Job requests",
    "Openings",
    "Candidates",
    "Pipeline",
    "Interviews",
    "Evaluation",
    "Offers",
    "Hiring",
    "Analytics",
  ];

  return (
    <>
      <PageTitle
        eyebrow="Talent acquisition"
        title="Recruitment"
        subtitle="From approved job request to employee creation"
        actions={
          <button className="primary-button">
            <Icon name="plus" /> {tr("Create opening")}
          </button>
        }
      />

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

      <div className="kpi-grid compact">
        {[
          ["Open roles", "12", "blue"],
          ["Candidates", "286", "indigo"],
          ["Interviews", "18", "violet"],
          ["Offers", "5", "green"],
          ["Avg. time to hire", "24d", "amber"],
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

      <div className="pipeline">
        {initialPipelineStages.map(([stage, people]) => (
          <div className="pipeline-col" key={stage}>
            <div className="pipeline-head">
              <strong>{tr(stage)}</strong>
              <span>{people.length}</span>
            </div>
            {people.map((p, i) => (
              <button
                className="candidate-card"
                key={p}
                onClick={() => setCandidate(p)}
              >
                <div>
                  <span className="avatar avatar-indigo">
                    {p
                      .split(" ")
                      .map((x) => x[0])
                      .join("")}
                  </span>
                  <div>
                    <strong>{p}</strong>
                    <small>
                      {i % 2
                        ? tr("QA Automation Lead")
                        : tr("Senior Product Designer")}
                    </small>
                  </div>
                </div>
                <div>
                  <Badge tone={i === 0 ? "green" : "blue"}>
                    {82 - i * 7}% {tr("Match")}
                  </Badge>
                  <Icon name="arrow" />
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>

      {candidate && (
        <CandidateDrawer
          candidate={candidate}
          close={() => setCandidate(null)}
        />
      )}
    </>
  );
}

export default RecruitmentView;
