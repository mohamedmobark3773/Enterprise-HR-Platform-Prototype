"use client";

import React from "react";
import { useApp } from "@/lib/context/AppContext";

export interface PaginationProps {
  count: string;
  page: number;
  pages: number[];
  onPage?: (page: number) => void;
}

export function Pagination({ count, page, pages, onPage }: PaginationProps) {
  const { tr } = useApp();
  return (
    <div className="pagination">
      <span>{tr(count)}</span>
      <div>
        {pages.map((p) => (
          <button key={p} className={p === page ? "active" : ""} onClick={() => onPage?.(p)}>
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Pagination;
