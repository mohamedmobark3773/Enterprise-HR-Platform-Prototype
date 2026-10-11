"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Locale, NavigationCopy, Page } from "@/types";
import { localizeApplication, navigationCopy, translateText } from "@/lib/localization/localization";

interface AppContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dark: boolean;
  setDark: (dark: boolean) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileMenu: boolean;
  setMobileMenu: (open: boolean) => void;
  globalSearch: string;
  setGlobalSearch: (query: string) => void;
  t: NavigationCopy;
  tr: (text: string) => string;
  activePage: Page;
  navigate: (page: Page) => void;
  navigatePath: (path: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const pathToPageMap: Record<string, Page> = {
  "/": "dashboard",
  "/dashboard": "dashboard",
  "/employees": "employees",
  "/organization": "organization",
  "/attendance": "attendance",
  "/face-recognition": "face",
  "/face-recognition/enrollment": "face",
  "/leave": "leave",
  "/permissions": "permissions",
  "/recruitment": "recruitment",
  "/recruitment/candidates": "recruitment",
  "/recruitment/jobs": "recruitment",
  "/payroll": "payroll",
  "/finance": "finance",
  "/finance/accounts": "finance",
  "/finance/ledger": "finance",
  "/finance/income-expenses": "finance",
  "/finance/sales": "finance",
  "/finance/purchases": "finance",
  "/finance/payments": "finance",
  "/finance/budgets": "finance",
  "/finance/cash-flow": "finance",
  "/finance/reports": "finance",
  "/finance/invoice-ocr": "finance",
  "/finance/production-states": "finance",
  "/inventory": "inventory",
  "/drilling": "drilling",
  "/projects": "projects",
  "/reports": "reports",
  "/gis": "gis",
  "/ai-center": "ai-center",
  "/fleet": "fleet",
  "/fleet/vehicles": "fleet",
  "/fleet/drivers": "fleet",
  "/fleet/movement-orders": "fleet",
  "/fleet/trips": "fleet",
  "/fleet/fuel": "fleet",
  "/fleet/maintenance": "fleet",
  "/fleet/expenses": "fleet",
  "/fleet/insurance": "fleet",
  "/fleet/licenses": "fleet",
  "/fleet/inspection": "fleet",
  "/fleet/equipment": "fleet",
  "/fleet/equipment/dashboard": "fleet",
  "/fleet/equipment-maintenance": "fleet",
  "/fleet/work-orders": "fleet",
  "/fleet/spare-parts": "fleet",
  "/fleet/failures": "fleet",
  "/fleet/lifecycle": "fleet",
  "/fleet/reports": "fleet",
  "/fleet/utilization": "fleet",
  "/fleet/cost-analytics": "fleet",
  "/fleet/overview": "fleet",
  "/training": "training",
  "/performance": "performance",
  "/hr-reports": "hr-reports",
  "/hr-state-matrix": "hr-state-matrix",
  "/profile": "profile",
  "/activity-logs": "activity-logs",
  "/users": "users",
  "/branches": "branches",
  "/loans": "loans",
  "/documents": "documents",
  "/workflows": "workflows",
  "/approvals": "workflows",
  "/analytics": "analytics",
  "/notifications": "notifications",
  "/ai": "ai",
  "/ai/models": "ai",
  "/ai/predictions": "ai",
  "/ai/assistant": "ai",
  "/portal": "portal",
  "/manager": "manager",
  "/audit": "audit",
  "/rbac": "rbac",
  "/settings": "settings",
};

const pageToPathMap: Record<Page, string> = {
  dashboard: "/dashboard",
  employees: "/employees",
  organization: "/organization",
  attendance: "/attendance",
  face: "/face-recognition",
  leave: "/leave",
  permissions: "/permissions",
  recruitment: "/recruitment",
  payroll: "/payroll",
  finance: "/finance",
  training: "/training",
  performance: "/performance",
  "hr-reports": "/hr-reports",
  "hr-state-matrix": "/hr-state-matrix",
  profile: "/profile",
  "activity-logs": "/activity-logs",
  users: "/users",
  branches: "/branches",
  inventory: "/inventory",
  drilling: "/drilling",
  projects: "/projects",
  reports: "/reports",
  gis: "/gis",
  "ai-center": "/ai-center",
  fleet: "/fleet",
  loans: "/loans",
  documents: "/documents",
  workflows: "/workflows",
  analytics: "/analytics",
  notifications: "/notifications",
  ai: "/ai",
  portal: "/portal",
  manager: "/manager",
  audit: "/audit",
  rbac: "/rbac",
  settings: "/settings",
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [dark, setDark] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [globalSearch, setGlobalSearch] = useState<string>("");

  useEffect(() => {
    try {
      const storedLocale = window.localStorage.getItem("nexus-locale") as Locale | null;
      if (storedLocale === "en" || storedLocale === "fr" || storedLocale === "ar") {
        setLocaleState(storedLocale);
      }
      const storedDark = window.localStorage.getItem("nexus-dark");
      if (storedDark === "1" || storedDark === "0") {
        setDark(storedDark === "1");
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setDark(true);
      }
    } catch {
      // ignore storage access errors
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("nexus-dark", dark ? "1" : "0");
    } catch {}
  }, [dark]);

  useEffect(() => {
    try {
      window.localStorage.setItem("nexus-locale", locale);
    } catch {}
  }, [locale]);

  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const activePage: Page =
    pathToPageMap[pathname] ||
    (pathname.startsWith("/fleet")
      ? "fleet"
      : pathname.startsWith("/drilling")
        ? "drilling"
        : pathname.startsWith("/projects")
          ? "projects"
          : pathname.startsWith("/reports")
            ? "reports"
            : pathname.startsWith("/gis")
              ? "gis"
              : pathname.startsWith("/ai-center")
                ? "ai-center"
                : "dashboard");

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("dir", newLocale === "ar" ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", newLocale);
    }
  };

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  const navigate = (page: Page) => {
    setMobileMenu(false);
    setGlobalSearch("");
    const targetPath = pageToPathMap[page] || "/dashboard";
    startTransition(() => {
      router.push(targetPath);
    });
  };

  const navigatePath = (path: string) => {
    setMobileMenu(false);
    setGlobalSearch("");
    startTransition(() => {
      router.push(path);
    });
  };

  const tr = (text: string) => translateText(text, locale);
  const t = navigationCopy[locale];

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.getElementById("app-root") || document.body;
    if (!root) return;

    localizeApplication(root, locale);
    const observer = new MutationObserver(() => localizeApplication(root, locale));
    observer.observe(root, { childList: true, subtree: true, characterData: true });

    return () => observer.disconnect();
  }, [locale, pathname, globalSearch]);

  return (
    <AppContext.Provider
      value={{
        locale,
        setLocale,
        dark,
        setDark,
        collapsed,
        setCollapsed,
        mobileMenu,
        setMobileMenu,
        globalSearch,
        setGlobalSearch,
        t,
        tr,
        activePage,
        navigate,
        navigatePath,
      }}
    >
      <div
        id="app-root"
        className={`app ${dark ? "dark" : ""}`}
        dir={locale === "ar" ? "rtl" : "ltr"}
        lang={locale}
      >
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
}
