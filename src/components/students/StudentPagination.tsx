"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StudentPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function StudentPagination({ page, totalPages, onPageChange }: StudentPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="p-4 bg-white border border-zinc-200/80 rounded-2xl flex justify-between items-center shadow-sm">
      <p className="text-xs text-zinc-400 font-bold">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
          className="p-1.5 bg-white border border-zinc-200 rounded-lg disabled:opacity-40 hover:bg-zinc-50 transition-all text-zinc-700 cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          className="p-1.5 bg-white border border-zinc-200 rounded-lg disabled:opacity-40 hover:bg-zinc-50 transition-all text-zinc-700 cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}