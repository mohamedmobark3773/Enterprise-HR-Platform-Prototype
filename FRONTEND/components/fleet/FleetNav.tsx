"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";

import { fleetNavLinks } from "@/lib/fleet/fleet-nav";

export function FleetNav() {
  const pathname = usePathname();
  const { tr } = useApp();

  const activePath = fleetNavLinks
    .filter((link) =>
      link.path === "/fleet"
        ? pathname === "/fleet"
        : pathname === link.path || pathname.startsWith(`${link.path}/`)
    )
    .sort((a, b) => b.path.length - a.path.length)[0]?.path;

  return (
    <nav className="finance-nav fleet-nav" aria-label="Fleet navigation">
      {fleetNavLinks.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={activePath === link.path ? "active" : ""}
        >
          {tr(link.label)}
        </Link>
      ))}
    </nav>
  );
}

export default FleetNav;
