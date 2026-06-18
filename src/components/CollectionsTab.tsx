"use client";

import React from "react";
import { Plus, Loader2, FileSpreadsheet } from "lucide-react";
import TransactionsList from "./TransactionLists";

interface CollectionsTabProps {
  exporting: boolean;
  handleExportToExcel: () => Promise<void>;
  setIsPayOpen: (open: boolean) => void;
}

export default function CollectionsTab({ exporting, handleExportToExcel, setIsPayOpen }: CollectionsTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="flex flex-wrap justify-between items-center bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Financial Audit Panel</h1>
          <p className="text-zinc-400 text-sm mt-0.5">Real-time verification ledger records</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportToExcel}
            disabled={exporting}
            className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-5 py-3 rounded-xl text-xs font-semibold hover:bg-emerald-600 hover:text-white flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {exporting ? <Loader2 size={14} className="animate-spin" /> : <FileSpreadsheet size={14} />} 
            {exporting ? "Compiling Report..." : "Export Excel"}
          </button>
          <button onClick={() => setIsPayOpen(true)} className="bg-zinc-900 text-white px-5 py-3 rounded-xl text-xs font-semibold hover:bg-emerald-600 transition-all flex items-center gap-2">
            <Plus size={14} /> New Payment
          </button>
        </div>
      </div>
      <TransactionsList />
    </div>
  );
}