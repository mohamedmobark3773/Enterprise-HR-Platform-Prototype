"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import {
  stage8ModuleEntry,
  stage8ModuleForPath,
  stage8ModuleLabels,
  stage8ModuleOrder,
  stage8Screens,
} from "@/lib/stage8/nav";
import type { Stage8Module } from "@/lib/stage8/types";

export function Stage8Nav({ module }: { module?: Stage8Module }) {
  const pathname = usePathname();
  const { tr } = useApp();
  const current = module ?? stage8ModuleForPath(pathname) ?? "reports";
  const screens = stage8Screens.filter((screen) => screen.module === current);

  const isActive = (path: string) =>
    path === pathname || (path !== stage8ModuleEntry[current] && pathname.startsWith(`${path}/`)) ||
    (path === stage8ModuleEntry[current] && pathname === path);

  return (
    <nav className="stage8-nav" aria-label="Reports, GIS and AI navigation">
      <div className="stage8-nav-modules">
        {stage8ModuleOrder.map((key) => (
          <Link
            key={key}
            href={stage8ModuleEntry[key]}
            className={key === current ? "stage8-nav-module active" : "stage8-nav-module"}
          >
            {tr(stage8ModuleLabels[key])}
          </Link>
        ))}
      </div>
      <div className="stage8-nav-links">
        {screens.map((screen) => (
          <Link
            key={screen.key}
            href={screen.path}
            className={isActive(screen.path) ? "stage8-nav-link active" : "stage8-nav-link"}
            aria-current={isActive(screen.path) ? "page" : undefined}
          >
            {tr(screen.label)}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Stage8Nav;
