import { Page } from "@/types";
import { drillingScreens } from "@/lib/drilling/drilling-nav";
import { projectScreens } from "@/lib/projects/projects-nav";
import { fleetNavLinks } from "@/lib/fleet/fleet-nav";
import { financeRoutes } from "@/lib/finance/finance-nav";
import { financeScreenLabels } from "@/lib/finance/finance-data";
import { stage8Screens } from "@/lib/stage8/nav";
import { platformRecordData } from "@/lib/platform/platform-record-data";

export interface NavItem {
  id: Page;
  path: string;
  icon: string;
  section?: boolean;
}

export const navItems: NavItem[] = [
  { id: "dashboard", path: "/dashboard", icon: "grid" },
  { id: "employees", path: "/employees", icon: "users" },
  { id: "organization", path: "/organization", icon: "org" },
  { id: "attendance", path: "/attendance", icon: "clock", section: true },
  { id: "face", path: "/face-recognition", icon: "scan" },
  { id: "leave", path: "/leave", icon: "calendar" },
  { id: "permissions", path: "/permissions", icon: "shield" },
  { id: "recruitment", path: "/recruitment", icon: "briefcase", section: true },
  { id: "payroll", path: "/payroll", icon: "wallet" },
  { id: "finance", path: "/finance", icon: "wallet", section: true },
  { id: "loans", path: "/loans", icon: "coins" },
  { id: "documents", path: "/documents", icon: "file" },
  { id: "workflows", path: "/workflows", icon: "flow", section: true },
  { id: "analytics", path: "/analytics", icon: "chart" },
  { id: "notifications", path: "/notifications", icon: "bell" },
  { id: "ai", path: "/ai", icon: "spark" },
  { id: "portal", path: "/portal", icon: "user", section: true },
  { id: "manager", path: "/manager", icon: "team" },
  { id: "audit", path: "/audit", icon: "shield" },
  { id: "rbac", path: "/rbac", icon: "users" },
  { id: "settings", path: "/settings", icon: "settings" },
  { id: "users", path: "/users", icon: "users" },
  { id: "branches", path: "/branches", icon: "org" },
  { id: "inventory", path: "/inventory", icon: "chart" },
  { id: "fleet", path: "/fleet", icon: "chart" },
  { id: "drilling", path: "/drilling", icon: "drill", section: true },
  { id: "projects", path: "/projects", icon: "flow", section: true },
  { id: "reports", path: "/reports", icon: "file", section: true },
  { id: "gis", path: "/gis", icon: "org" },
  { id: "ai-center", path: "/ai-center", icon: "spark" },
];

/**
 * Sidebar child entry. Children that reuse an existing top-level `Page` keep
 * their sidebar label (`t[id]`) and `navigate(id)` behavior; destinations that
 * never had a sidebar entry carry their existing in-page label, rendered with
 * `tr()` exactly like the overview panels render them today.
 */
export interface NavChild {
  id?: Page;
  label?: string;
  path: string;
}

export interface NavGroup {
  id: string;
  label: string;
  icon: string;
  overview: string;
  children: NavChild[];
}

/**
 * Exactly eight expandable top-level sidebar groups. Every child destination
 * is an existing route — no new pages, no invented destinations. Labels are
 * sourced from the same inventories as the in-page navigation panels.
 */
export const navGroups: NavGroup[] = [
  {
    id: "core",
    label: "Core Platform",
    icon: "grid",
    overview: "/dashboard",
    children: [
      { id: "dashboard", path: "/dashboard" },
      { id: "portal", path: "/portal" },
      { id: "manager", path: "/manager" },
      { id: "notifications", path: "/notifications" },
      { label: "Approvals", path: "/approvals" },
      { label: platformRecordData["activity-logs"].title, path: "/activity-logs" },
      { id: "audit", path: "/audit" },
      { id: "rbac", path: "/rbac" },
      { id: "users", path: "/users" },
      { id: "branches", path: "/branches" },
      { id: "settings", path: "/settings" },
      { label: platformRecordData.profile.title, path: "/profile" },
    ],
  },
  {
    id: "hr",
    label: "HR Management",
    icon: "users",
    overview: "/employees",
    children: [
      { id: "employees", path: "/employees" },
      { id: "organization", path: "/organization" },
      { id: "attendance", path: "/attendance" },
      { id: "face", path: "/face-recognition" },
      { id: "leave", path: "/leave" },
      { id: "recruitment", path: "/recruitment" },
      { id: "payroll", path: "/payroll" },
      { id: "loans", path: "/loans" },
      { id: "documents", path: "/documents" },
      { id: "workflows", path: "/workflows" },
      { id: "analytics", path: "/analytics" },
      { id: "training", path: "/training" },
      { id: "performance", path: "/performance" },
      { id: "hr-reports", path: "/hr-reports" },
      { id: "hr-state-matrix", path: "/hr-state-matrix" },
    ],
  },
  {
    id: "finance",
    label: "Finance & Accounting",
    icon: "wallet",
    overview: "/finance",
    children: financeRoutes.map(([key, path]) => ({ label: financeScreenLabels[key], path })),
  },
  {
    id: "inventory",
    label: "Inventory & Spare Parts",
    icon: "chart",
    overview: "/inventory",
    children: [
      { label: "Inventory Dashboard", path: "/inventory" },
      { label: "Items / Spare Parts", path: "/inventory/items" },
      { label: "Categories", path: "/inventory/categories" },
      { label: "Warehouses", path: "/inventory/warehouses" },
      { label: "Suppliers", path: "/inventory/suppliers" },
      { label: "Purchase Requests / Orders", path: "/inventory/purchase-orders" },
      { label: "Receiving", path: "/inventory/receiving" },
      { label: "Transfers", path: "/inventory/transfers" },
      { label: "Stock In", path: "/inventory/stock-in" },
      { label: "Stock Out", path: "/inventory/stock-out" },
      { label: "Stock Adjustments", path: "/inventory/adjustments" },
      { label: "Stocktaking", path: "/inventory/stocktaking" },
      { label: "Inventory Production State Matrix", path: "/inventory/production-states" },
      { label: "Low Stock Alerts", path: "/inventory/low-stock-alerts" },
      { label: "Inventory Reports", path: "/inventory/reports" },
    ],
  },
  {
    id: "fleet",
    label: "Fleet & Equipment",
    icon: "chart",
    overview: "/fleet",
    children: fleetNavLinks.map((link) => ({ label: link.label, path: link.path })),
  },
  {
    id: "drilling",
    label: "Drilling Projects",
    icon: "drill",
    overview: "/drilling",
    children: drillingScreens.map((screen) => ({ label: screen.label, path: screen.path })),
  },
  {
    id: "projects",
    label: "Project Management",
    icon: "flow",
    overview: "/projects",
    children: projectScreens
      .filter((screen) => !screen.hidden)
      .map((screen) => ({ label: screen.label, path: screen.path })),
  },
  {
    id: "stage8",
    label: "Reports, GIS & AI Center",
    icon: "file",
    overview: "/reports",
    children: stage8Screens.map((screen) => ({ label: screen.label, path: screen.path })),
  },
];

export const iconPaths: Record<string, string> = {
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  org: "M12 3v6M6 21v-4H3v-4h6v4H6M18 21v-4h-3v-4h6v4h-3M6 13V9h12v4",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  scan: "M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3M9 10h.01M15 10h.01M9.5 15a4 4 0 0 0 5 0",
  calendar: "M3 6h18v15H3zM16 3v6M8 3v6M3 11h18",
  briefcase: "M9 6V4h6v2M3 7h18v13H3zM3 12a18 18 0 0 0 18 0M10 12h4",
  wallet: "M3 6h16v14H3zM16 10h6v6h-6zM3 6l13-3v3",
  coins: "M12 6c0 1.66-3.13 3-7 3S-2 7.66-2 6s3.13-3 7-3 7 1.34 7 3zM-2 6v4c0 1.66 3.13 3 7 3M12 6v4M22 14c0 1.66-3.13 3-7 3s-7-1.34-7-3 3.13-3 7-3 7 1.34 7 3zM8 14v4c0 1.66 3.13 3 7 3s7-1.34 7-3v-4",
  file: "M6 2h9l5 5v15H6zM14 2v6h6M9 13h6M9 17h6",
  flow: "M6 3h4v4H6zM14 17h4v4h-4zM8 7v5a4 4 0 0 0 4 4h2M12 5h6v6",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
  spark: "m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-5",
  settings: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.56V21h-4v-.08a1.7 1.7 0 0 0-1-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1H3v-4h.08a1.7 1.7 0 0 0 1.56-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.56V3h4v.08a1.7 1.7 0 0 0 1 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.56 1H21v4h-.08a1.7 1.7 0 0 0-1.56 1z",
  user: "M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10",
  team: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M17 3.13a4 4 0 0 1 0 7.75",
  chevron: "m9 18 6-6-6-6",
  plus: "M12 5v14M5 12h14",
  dots: "M5 12h.01M12 12h.01M19 12h.01",
  search: "M21 21l-4.35-4.35M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0z",
  download: "M12 3v12M7 10l5 5 5-5M5 21h14",
  check: "m5 12 4 4L19 6",
  edit: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",
  trash: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  arrow: "M5 12h14M14 7l5 5-5 5",
  menu: "M4 6h16M4 12h16M4 18h16",
  drill: "M12 2 9 7h6zM10 9h4l-1 5h-2zM11 14h2v6h-2zM9 21h6",
  sun: "M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  moon: "M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z",
};
