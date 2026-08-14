"use client";

import React from "react";
import { CreditCard } from "lucide-react";

interface TransactionRecord {
  _id: string;
  paymentId: string;
  description: string;
  amount: string;
  date: string;
  status: "Success" | "Pending" | "Failed";
}

interface TransactionsTabProps {
  transactions: TransactionRecord[];
}

export default function TransactionsTab({ transactions }: TransactionsTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Payment & Receipt Records</h1>
        <p className="text-xs text-zinc-500 mt-1">Review fees paid for training tracks and internship registrations.</p>
      </div>

      {transactions.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center space-y-3">
          <CreditCard className="w-10 h-10 text-zinc-300 mx-auto" />
          <h3 className="text-sm font-bold text-zinc-800">No payment records found</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Your registration transactions will be documented here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-black uppercase text-zinc-400">
                  <th className="p-4">Payment ID</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs">
                {transactions.map((tx) => (
                  <tr key={tx._id} className="hover:bg-zinc-50/50">
                    <td className="p-4 font-mono font-bold text-zinc-800">{tx.paymentId}</td>
                    <td className="p-4 font-medium text-zinc-700">{tx.description}</td>
                    <td className="p-4 text-zinc-500">{tx.date}</td>
                    <td className="p-4 font-bold text-zinc-900">{tx.amount}</td>
                    <td className="p-4 text-right">
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-full text-[10px] uppercase">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}