"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Loader2, RefreshCw, Search, CheckCircle, AlertTriangle, Users, Filter, Eye, X, Calendar, CreditCard, Award, Phone, Building, ChevronLeft, ChevronRight } from "lucide-react";

export default function StudentsTab() {
  const [students, setStudents] = useState<any[]>([]);
  const [availableDomains, setAvailableDomains] = useState<string[]>(["All"]);
  const [studentsLoading, setStudentsLoading] = useState(true);
  
  const [studentSearch, setStudentSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  
  const [paginationInfo, setPaginationInfo] = useState({ total: 0, duesCount: 0, clearCount: 0, totalPages: 1 });
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(studentSearch), 350);
    return () => clearTimeout(timer);
  }, [studentSearch]);

  const fetchStudents = useCallback(async () => {
    setStudentsLoading(true);
    try {
      const queryUrl = `/api/payments?search=${encodeURIComponent(debouncedSearch)}&domain=${encodeURIComponent(selectedDomain)}&page=${currentPage}&limit=20`;
      const res = await fetch(queryUrl);
      const result = await res.json();
      
      if (result.success) {
        setStudents(result.students || []);
        setAvailableDomains(result.availableDomains || ["All"]);
        setPaginationInfo({
          total: result.pagination.total,
          duesCount: result.pagination.duesCount,
          clearCount: result.pagination.clearCount,
          totalPages: result.pagination.totalPages
        });
      }
    } catch (err) {
      console.error("Failed fetching paginated logs: ", err);
    } finally {
      setStudentsLoading(false);
    }
  }, [debouncedSearch, selectedDomain, currentPage]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Reset page marker safely if core structural query modifications occur
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedDomain]);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* HEADER BAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm gap-6">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Student Directory</h1>
          <p className="text-zinc-400 text-sm mt-0.5">Scalable high-speed database aggregation monitoring engine</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 min-w-[240px] sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
            <input 
              type="text" 
              placeholder="Search name, phone, or university..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 text-xs font-medium rounded-xl text-zinc-800 outline-none focus:border-zinc-400 focus:bg-white transition-all"
            />
          </div>
          <button onClick={fetchStudents} className="p-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-500 border border-zinc-200 rounded-xl transition-colors h-10 flex items-center justify-center">
            <RefreshCw size={14} className={studentsLoading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* STATS INFOGRAPHIC ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-sm flex items-center gap-4">
          <span className="p-3 bg-zinc-100 text-zinc-800 rounded-xl"><Users size={18} /></span>
          <div>
            <p className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Total Matches Found</p>
            <p className="text-xl font-black text-zinc-900 mt-0.5">{paginationInfo.total} Students</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-sm flex items-center gap-4">
          <span className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle size={18} /></span>
          <div>
            <p className="text-[10px] font-black uppercase text-emerald-500 tracking-wider">Cleared Profiles</p>
            <p className="text-xl font-black text-emerald-600 mt-0.5">{paginationInfo.clearCount} Accounts</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-sm flex items-center gap-4">
          <span className="p-3 bg-amber-50 text-amber-600 rounded-xl"><AlertTriangle size={18} /></span>
          <div>
            <p className="text-[10px] font-black uppercase text-amber-500 tracking-wider">Accounts With Dues</p>
            <p className="text-xl font-black text-amber-600 mt-0.5">{paginationInfo.duesCount} Accounts</p>
          </div>
        </div>
      </div>

      {/* FILTER ROW */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex items-center gap-3 overflow-x-auto scrollbar-none">
        <span className="text-zinc-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shrink-0 pl-2">
          <Filter size={12} /> Domain:
        </span>
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          {availableDomains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
                selectedDomain === dom ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* ROSTER DATA GRID TABLE */}
      {studentsLoading ? (
        <div className="h-64 bg-white rounded-[2rem] border border-zinc-100 flex items-center justify-center">
          <Loader2 className="animate-spin text-emerald-600" size={28} />
        </div>
      ) : students.length === 0 ? (
        <div className="text-center py-20 bg-white border border-zinc-100 rounded-[2rem] text-zinc-400 text-sm font-medium">
          No student match conditions found inside filtered database limits.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-[2rem] border border-zinc-100 shadow-sm overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100 text-[10px] font-black uppercase tracking-widest text-zinc-400 select-none">
                    <th className="py-4 px-6">Student Information</th>
                    <th className="py-4 px-6">Specialized Track / Duration</th>
                    <th className="py-4 px-6">Total Billing</th>
                    <th className="py-4 px-6">Balance Dues Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-xs text-zinc-700 font-medium">
                  {students.map((student, sIdx) => {
                    const hasDues = student.balanceAmount > 0;
                    return (
                      <tr key={student.phone || sIdx} className="hover:bg-zinc-50/50 transition-colors duration-150">
                        <td className="py-4 px-6 space-y-1">
                          <div className="font-bold text-zinc-900 text-sm">{student.name}</div>
                          <div className="text-zinc-400 font-mono">{student.phone}</div>
                          <div className="text-zinc-500 max-w-sm truncate">{student.college}</div>
                        </td>
                        <td className="py-4 px-6 space-y-1">
                          <div><span className="px-2 py-0.5 bg-zinc-100 text-zinc-800 font-bold rounded border border-zinc-200">{student.domain}</span></div>
                          <div className="text-zinc-400 font-semibold pl-1 mt-1">{student.duration}</div>
                        </td>
                        <td className="py-4 px-6 font-bold text-zinc-900 text-sm">₹{student.totalBilling?.toLocaleString("en-IN")}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            {hasDues ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-1 rounded bg-amber-50 text-amber-700 border border-amber-100">
                                <AlertTriangle size={12} /> Pending Dues: ₹{student.balanceAmount.toLocaleString("en-IN")}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                                <CheckCircle size={12} /> Clear No Dues
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button onClick={() => setSelectedStudent(student)} className="p-2 text-zinc-400 hover:text-zinc-900 border border-zinc-100 bg-white shadow-sm hover:border-zinc-300 rounded-xl transition-all inline-flex items-center gap-1.5 text-xs font-semibold">
                            <Eye size={14} /> Profile History
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* DYNAMIC PAGINATION FOOTER BUTTONS CONTROLS */}
          {paginationInfo.totalPages > 1 && (
            <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-zinc-100 shadow-sm text-xs font-bold text-zinc-500">
              <span>Showing Page {currentPage} of {paginationInfo.totalPages}</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-zinc-200 rounded-xl hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(paginationInfo.totalPages, prev + 1))}
                  disabled={currentPage === paginationInfo.totalPages}
                  className="p-2 border border-zinc-200 rounded-xl hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STUDENT DETAILS DRAWER OVERLAY */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[1050] bg-zinc-950/40 backdrop-blur-sm flex items-center justify-end animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-zinc-100">
            <div className="p-6 border-b border-zinc-100 bg-zinc-50/50 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-zinc-900 text-white rounded-xl"><Users size={16} /></span>
                <div>
                  <h2 className="text-base font-bold text-zinc-900">Student Profile Summary</h2>
                  <p className="text-[10px] font-mono text-zinc-400 mt-0.5">UID: {selectedStudent.phone}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="p-2 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 rounded-xl"><X size={18} /></button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-5 space-y-3.5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-black text-zinc-900 leading-tight">{selectedStudent.name}</h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5 flex items-center gap-1"><Phone size={12} /> {selectedStudent.phone}</p>
                  </div>
                  <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider border ${selectedStudent.balanceAmount > 0 ? "bg-amber-50 text-amber-700 border-amber-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"}`}>
                    {selectedStudent.balanceAmount > 0 ? "Incomplete Dues" : "Verified Clear"}
                  </span>
                </div>
                <hr className="border-dashed border-zinc-200" />
                <div className="space-y-2 text-xs font-semibold text-zinc-600">
                  <p className="flex items-center gap-2 text-zinc-800"><Building size={14} className="text-zinc-400 shrink-0" /> {selectedStudent.college}</p>
                  <p className="flex items-center gap-2 text-zinc-800"><Award size={14} className="text-zinc-400 shrink-0" /> {selectedStudent.domain} ({selectedStudent.duration})</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Financial State</h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white border border-zinc-200 rounded-xl p-3"><p className="text-[9px] font-bold text-zinc-400 uppercase">Total Fee</p><p className="text-sm font-black text-zinc-900 mt-1">₹{selectedStudent.totalBilling?.toLocaleString("en-IN")}</p></div>
                  <div className="bg-white border border-zinc-200 rounded-xl p-3"><p className="text-[9px] font-bold text-emerald-500 uppercase">Paid Now</p><p className="text-sm font-black text-emerald-600 mt-1">₹{(selectedStudent.totalBilling - selectedStudent.balanceAmount).toLocaleString("en-IN")}</p></div>
                  <div className="bg-white border border-zinc-200 rounded-xl p-3"><p className="text-[9px] font-bold text-amber-500 uppercase">Balance</p><p className="text-sm font-black text-amber-600 mt-1">₹{selectedStudent.balanceAmount?.toLocaleString("en-IN")}</p></div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Processed Receipts Timeline</h4>
                {(selectedStudent.installments || []).length === 0 ? (
                  <div className="text-center py-8 bg-zinc-50 border border-zinc-100 rounded-xl text-xs text-zinc-400 font-semibold">No verified collection assets found for this candidate.</div>
                ) : (
                  <div className="space-y-3">
                    {selectedStudent.installments.map((receipt: any, rIdx: number) => (
                      <div key={receipt.receiptNo || rIdx} className="bg-white border border-zinc-100 shadow-sm rounded-xl p-4 flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <p className="font-mono text-xs font-black text-zinc-800 tracking-tight">{receipt.receiptNo}</p>
                          <p className="text-[11px] text-zinc-400 flex items-center gap-1"><Calendar size={12} /> {receipt.date}</p>
                          <p className="text-[11px] text-zinc-500 flex items-center gap-1"><CreditCard size={11} /> Auth By: <span className="font-bold text-zinc-700">{receipt.billingBy}</span></p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-sm font-black text-emerald-600">₹{receipt.paidAmount?.toLocaleString("en-IN")}</p>
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider bg-zinc-100 text-zinc-700 border">{receipt.paymentMethod}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-zinc-100 bg-zinc-50 flex justify-end">
              <button onClick={() => setSelectedStudent(null)} className="w-full px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-xl">Close Profile Document</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}