"use client";

import React, { useMemo, useState } from "react";
import { useApp } from "@/lib/context/AppContext";
import { accountTree, type AccountNode } from "@/lib/finance/finance-data";

function flatten(nodes: AccountNode[], acc: string[] = []): string[] {
  for (const n of nodes) {
    acc.push(n.code);
    if (n.children) flatten(n.children, acc);
  }
  return acc;
}

function findNode(nodes: AccountNode[], code: string): AccountNode | undefined {
  for (const n of nodes) {
    if (n.code === code) return n;
    if (n.children) {
      const found = findNode(n.children, code);
      if (found) return found;
    }
  }
  return undefined;
}

export function AccountHierarchy({ selected, onSelect }: { selected: string; onSelect: (node: AccountNode) => void }) {
  const { tr } = useApp();
  const allCodes = useMemo(() => flatten(accountTree), []);
  const [expandedAll, setExpandedAll] = useState(true);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const toggle = (code: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  const visible = (node: AccountNode) => true;
  const isOpen = (code: string) => (expandedAll ? !collapsed.has(code) : collapsed.has(code));

  const renderNode = (node: AccountNode, level: number, keyPrefix: string): React.ReactNode => {
    const open = isOpen(node.code);
    return (
      <React.Fragment key={keyPrefix}>
        <button
          type="button"
          className={`acct-tree-row ${selected === node.code ? "active" : ""}`}
          style={{ paddingInlineStart: `${level * 14 + 10}px` }}
          onClick={() => onSelect(node)}
        >
          <span
            className="acct-caret"
            onClick={(e) => { e.stopPropagation(); if (node.children) toggle(node.code); }}
            aria-hidden="true"
          >
            {node.children ? (open ? "▾" : "▸") : "·"}
          </span>
          <span className="acct-code">{node.code}</span>
          <span className="acct-name">{tr(node.name)}</span>
          {node.balance && <span className="acct-balance">{node.balance}</span>}
        </button>
        {node.children && open && node.children.map((child) => renderNode(child, level + 1, `${keyPrefix}-${child.code}`))}
      </React.Fragment>
    );
  };

  return (
    <section className="panel accounts-tree-panel">
      <div className="panel-head">
        <div>
          <h2>{tr("Account Hierarchy")}</h2>
          <p>{tr("Select an account to inspect its details")}</p>
        </div>
        <button
          type="button"
          className="text-button"
          onClick={() => { setExpandedAll(!expandedAll); setCollapsed(new Set()); }}
        >
          {tr(expandedAll ? "Collapse all" : "Expand all")}
        </button>
      </div>
      <div className="acct-tree" role="tree">
        {accountTree.map((node) => renderNode(node, 0, node.code))}
      </div>
    </section>
  );
}

export default AccountHierarchy;
