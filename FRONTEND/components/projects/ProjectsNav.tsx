"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { projectScreens, type ProjectScreenDef, type ProjectScreenGroup } from "@/lib/projects/projects-nav";

const groupLabels: Record<ProjectScreenGroup, string> = {
  core: "Core",
  planning: "Planning",
  execution: "Execution",
  financials: "Financials",
  assurance: "Assurance",
  intelligence: "AI intelligence",
};

const groups: ProjectScreenGroup[] = ["core", "planning", "execution", "financials", "assurance", "intelligence"];

export function ProjectsNav() {
  const pathname = usePathname();
  const { tr } = useApp();

  const isActive = (screen: ProjectScreenDef) =>
    screen.path === pathname ||
    (screen.path !== "/projects" && pathname.startsWith(`${screen.path}/`));

  return (
    <nav className="projects-nav" aria-label="Project management navigation">
      {groups.map((group) => {
        const screens = projectScreens.filter((screen) => screen.group === group && !screen.hidden);
        if (screens.length === 0) return null;
        return (
          <div className="projects-nav-group" key={group}>
            <span className="projects-nav-label">{tr(groupLabels[group])}</span>
            <div className="projects-nav-links">
              {screens.map((screen) => (
                <Link
                  key={screen.key}
                  href={screen.path}
                  className={isActive(screen) ? "active" : ""}
                  aria-current={isActive(screen) ? "page" : undefined}
                >
                  {tr(screen.label)}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
}

export default ProjectsNav;
