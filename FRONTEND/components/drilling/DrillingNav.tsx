"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { drillingScreens, type DrillingScreenDef } from "@/lib/drilling/drilling-nav";

const groupLabels: Record<DrillingScreenDef["group"], string> = {
  core: "Core records",
  execution: "Execution",
  resources: "Resources",
  assurance: "Assurance",
  intelligence: "AI intelligence",
};

export function DrillingNav() {
  const pathname = usePathname();
  const { tr } = useApp();

  const groups: DrillingScreenDef["group"][] = ["core", "execution", "resources", "assurance", "intelligence"];

  const isActive = (screen: DrillingScreenDef) =>
    screen.path === pathname ||
    (screen.path !== "/drilling" && pathname.startsWith(`${screen.path}/`));

  return (
    <nav className="drilling-nav" aria-label="Drilling navigation">
      {groups.map((group) => {
        const screens = drillingScreens.filter((screen) => screen.group === group);
        if (screens.length === 0) return null;
        return (
          <div className="drilling-nav-group" key={group}>
            <span className="drilling-nav-label">{tr(groupLabels[group])}</span>
            <div className="drilling-nav-links">
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

export default DrillingNav;
