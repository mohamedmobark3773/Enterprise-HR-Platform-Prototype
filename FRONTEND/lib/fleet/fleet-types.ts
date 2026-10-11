export interface FleetKpi {
  label: string;
  value: string;
  detail?: string;
}

export interface FleetChart {
  title: string;
  labels: string[];
  values: number[];
}

export interface FleetInsightConfig {
  title: string;
  lines: string[];
  action: string;
}

export interface FleetRowData {
  id: string;
  cells: string[];
  status: string;
  tone: string;
  href?: string;
}

export interface FleetListConfig {
  kind: "list";
  eyebrow: string;
  title: string;
  subtitle: string;
  action: string;
  searchPlaceholder: string;
  statusColumn?: string;
  tabs?: string[];
  kpis: FleetKpi[];
  columns: string[];
  rows: FleetRowData[];
  pagination: string;
  tags?: string[];
  chart?: FleetChart;
  insight: FleetInsightConfig;
  emptyLabel?: string;
}

export interface FleetDashboardPanel {
  title: string;
  meta?: string;
  action?: string;
  rows: { label: string; value: string; status: string; tone: string }[];
}

export interface FleetDashboardConfig {
  kind: "dashboard";
  eyebrow: string;
  title: string;
  subtitle: string;
  action: string;
  banner?: { label: string; value: string; detail: string };
  kpis: FleetKpi[];
  charts: FleetChart[];
  panels: FleetDashboardPanel[];
  insight: FleetInsightConfig;
}

export interface FleetBarList {
  title: string;
  max: number;
  items: { label: string; value: number; display: string }[];
}

export interface FleetAnalyticsConfig {
  kind: "analytics";
  eyebrow: string;
  title: string;
  subtitle: string;
  action: string;
  kpis: FleetKpi[];
  bars: FleetBarList[];
  table?: { title: string; columns: string[]; rows: string[][] };
  insight: FleetInsightConfig;
}

export interface FleetDetailSection {
  title: string;
  meta?: string;
  action?: string;
  columns: string[];
  rows: string[][];
  statusColumn?: string;
}

export interface FleetDetailRecord {
  hero: {
    icon: string;
    name: string;
    status: string;
    tone: string;
    code: string;
    subtitle: string;
  };
  fields: { label: string; value: string }[];
  kpis: FleetKpi[];
  sections: FleetDetailSection[];
  tags?: string[];
  actions: string[];
}

export interface FleetDetailConfig {
  kind: "detail";
  eyebrow: string;
  title: string;
  subtitle: string;
  action: string;
  tabs: string[];
  records: Record<string, FleetDetailRecord>;
  defaultId: string;
  insight: FleetInsightConfig;
}
