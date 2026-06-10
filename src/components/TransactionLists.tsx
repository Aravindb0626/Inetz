"use client";

import React, { useState, useEffect } from "react";
import { Loader2, ArrowLeftRight, Calendar, User, CreditCard, Building } from "lucide-react";

interface Transaction {
  receiptNo: string;
  date: string;
  name: string;
  phone: string;
  college: string;
  domain: string;
  paidAmount: number;
  paymentMethod: "Cash" | "GPay";
  transactionId: string;
  billingBy: string;
}

export default function TransactionsList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/transactions");
        const result = await response.json();
        
        if (result.success) {
          setTransactions(result.data);
        } else {
          setError(result.error || "Failed to download transaction data mapping layers.");
        }
      } catch (err) {
        console.error("Error reading backend data collections:", err);
        setError("Network exception error occurred while pulling live data grids.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center gap-3 text-zinc-500">
        <Loader2 className="animate-spin text-emerald-600" size={32} />
        <span className="text-sm font-medium">Loading live transactions registry...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full my-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-center text-sm font-semibold text-red-800">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white w-full rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
      {/* List Header Controls Block */}
      <div className="px-8 py-6 border-b border-zinc-100 bg-zinc-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-zinc-900 text-white rounded-xl">
            <ArrowLeftRight size={18} />
          </span>
          <div>
            <h2 className="text-base font-bold text-zinc-900">Real-time Transaction Audits</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Historical verification ledger of processed student enrollment fees</p>
          </div>
        </div>
        <div className="text-xs font-mono px-3 py-1.5 bg-zinc-100 text-zinc-600 rounded-lg self-start sm:self-auto font-semibold">
          Total Logs: {transactions.length}
        </div>
      </div>

      {/* Main Ledger Table Grid Container */}
      <div className="w-full overflow-x-auto">
        {transactions.length === 0 ? (
          <div className="text-center py-16 text-zinc-400 text-sm font-medium">
            No dynamic transaction entries discovered inside active databases.
          </div>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-100 text-[10px] font-black uppercase tracking-widest text-zinc-400 select-none">
                <th className="py-4 px-6">Receipt / Date</th>
                <th className="py-4 px-6">Student Information</th>
                <th className="py-4 px-6">Course Domain</th>
                <th className="py-4 px-6">Payment Stream</th>
                <th className="py-4 px-6">Authority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-sm text-zinc-700">
              {transactions.map((tx) => (
                <tr key={tx.receiptNo} className="hover:bg-zinc-50/70 transition-colors duration-150">
                  {/* Bill Identifiers Columns */}
                  <td className="py-4 px-6 space-y-1">
                    <div className="font-mono text-xs font-bold text-zinc-800 tracking-tight">{tx.receiptNo}</div>
                    <div className="text-zinc-400 text-xs flex items-center gap-1">
                      <Calendar size={12} /> {tx.date}
                    </div>
                  </td>

                  {/* Student Attributes Column */}
                  <td className="py-4 px-6 space-y-1">
                    <div className="font-semibold text-zinc-900 flex items-center gap-1.5">
                      <User size={13} className="text-zinc-400" /> {tx.name}
                    </div>
                    <div className="text-zinc-400 text-xs font-mono">{tx.phone}</div>
                    <div className="text-zinc-500 text-xs flex items-center gap-1 truncate max-w-[200px]" title={tx.college}>
                      <Building size={12} className="text-zinc-300 shrink-0" /> {tx.college}
                    </div>
                  </td>

                  {/* Program Allocation Target Column */}
                  <td className="py-4 px-6 vertical-middle">
                    <span className="px-2.5 py-1 bg-zinc-100 text-zinc-800 text-xs font-semibold rounded-lg inline-block border border-zinc-200/50">
                      {tx.domain}
                    </span>
                  </td>

                  {/* Financial Quantities Calculations Column */}
                  <td className="py-4 px-6 space-y-1">
                    <div className="font-bold text-emerald-600 text-base">
                      ₹{tx.paidAmount.toLocaleString("en-IN")}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        tx.paymentMethod === "GPay" 
                          ? "bg-blue-50 text-blue-700 border border-blue-100" 
                          : "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}>
                        {tx.paymentMethod}
                      </span>
                      {tx.paymentMethod === "GPay" && tx.transactionId !== "N/A" && (
                        <span className="font-mono text-[10px] text-zinc-400 truncate max-w-[110px]" title={tx.transactionId}>
                          ID: {tx.transactionId}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Auditor Processing Signature Columns */}
                  <td className="py-4 px-6 text-zinc-500 text-xs font-medium vertical-middle">
                    <div className="flex items-center gap-1 text-zinc-700 font-semibold">
                      <CreditCard size={12} className="text-zinc-400" /> {tx.billingBy}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}