"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { MobileBottom } from "@/components/layout/MobileBottom";
import { GlobalResults } from "@/components/layout/GlobalResults";
import { useApp } from "@/lib/context/AppContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { collapsed, globalSearch, setGlobalSearch } = useApp();
  const pathname = usePathname();

  if (["/login", "/forgot-password", "/two-factor"].includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar />
      <main className={`main ${collapsed ? "wide" : ""}`}>
        <Topbar />
        <div className="content">
          {globalSearch && (
            <GlobalResults
              query={globalSearch}
              close={() => setGlobalSearch("")}
            />
          )}
          {children}
        </div>
      </main>
      <MobileBottom />
    </>
  );
}

export default AppShell;
