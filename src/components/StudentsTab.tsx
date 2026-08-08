"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  X,
  Save,
  Loader2,
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  CreditCard,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  UserPlus,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

interface Installment {
  receiptNo: string;
  date: string;
  paidAmount: number;
  paymentMethod: string;
  transactionId?: string;
  billingBy: string;
}

interface StudentRecord {
  _id: string;
  sNo: number;
  doj: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  domain: string;
  duration: string;
  totalBilling: number;
  totalCollection: number;
  pendingAmount: number;
  feesStatus: "Pending" | "Fully Paid" | "Clear" | string;
  certificateStatus: "Pending" | "Issued" | string;
  installments: Installment[];
  createdAt?: string;
}

const DEFAULT_DOMAINS = [
  "Web Development",
  "Data Analytics",
  "Python Development",
  "Cyber Security",
  "Android App Development",
  "UI/UX Design",
];

const DEFAULT_DURATIONS = ["1 Week", "2 Weeks", "1 Month", "2 Months", "3 Months", "6 Months"];

export default function StudentsTab() {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [availableDomains, setAvailableDomains] = useState<string[]>(["All", ...DEFAULT_DOMAINS]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);

  // View/Edit Modal State
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Add Student Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Add Form Data State
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    domain: "Web Development",
    duration: "1 Month",
    totalBilling: "",
    initialPayment: "0",
    paymentMethod: "Cash",
    billingBy: "Admin",
  });

  const [addErrors, setAddErrors] = useState<Record<string, string>>({});

  // Edit Form Data State
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    domain: "",
    duration: "",
    totalBilling: 0,
    certificateStatus: "Pending",
    feesStatus: "Pending",
  });

  // Fetch Students Directory
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        search,
        domain: domainFilter,
        page: page.toString(),
        limit: "15",
      });

      const res = await axios.get(`/api/students?${query.toString()}`);
      if (res.data.success) {
        setStudents(res.data.students || []);
        if (res.data.availableDomains) {
          const mergedDomains = Array.from(new Set(["All", ...DEFAULT_DOMAINS, ...res.data.availableDomains]));
          setAvailableDomains(mergedDomains);
        }
        if (res.data.pagination) {
          setTotalPages(res.data.pagination.totalPages || 1);
          setTotalStudents(res.data.pagination.total || 0);
        }
      }
    } catch (err) {
      console.error("Failed to load students:", err);
    } finally {
      setLoading(false);
    }
  }, [search, domainFilter, page]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // ─────────────────────────────────────────────────────────────────────────────
  // FORM VALIDATION RULES (ALL REQUIRED EXCEPT EMAIL)
  // ─────────────────────────────────────────────────────────────────────────────
  const validateAddForm = () => {
    const errors: Record<string, string> = {};

    // 1. Name Validation (Required)
    if (!addForm.name.trim()) {
      errors.name = "Student Name is required.";
    } else if (addForm.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters long.";
    }

    // 2. Phone Validation (Required, exactly 10 digits)
    const cleanPhone = addForm.phone.replace(/\D/g, "");
    if (!addForm.phone.trim()) {
      errors.phone = "Mobile Number is required.";
    } else if (cleanPhone.length < 10) {
      errors.phone = "Please enter a valid 10-digit mobile number.";
    }

    // 3. Email Validation (OPTIONAL - validate format only if provided)
    if (addForm.email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(addForm.email.trim())) {
        errors.email = "Please enter a valid email address.";
      }
    }

    // 4. College / Institution (Required)
    if (!addForm.college.trim()) {
      errors.college = "College/Institution name is required.";
    }

    // 5. Domain (Required)
    if (!addForm.domain.trim()) {
      errors.domain = "Specialization domain is required.";
    }

    // 6. Duration (Required)
    if (!addForm.duration.trim()) {
      errors.duration = "Program duration is required.";
    }

    // 7. Total Billing Amount (Required, positive number)
    const numTotal = Number(addForm.totalBilling);
    if (!addForm.totalBilling || isNaN(numTotal) || numTotal <= 0) {
      errors.totalBilling = "Please enter a valid fee amount greater than 0.";
    }

    // 8. Initial Payment Validation (Cannot exceed total billing)
    const numPaid = Number(addForm.initialPayment) || 0;
    if (numPaid < 0) {
      errors.initialPayment = "Initial payment cannot be negative.";
    } else if (numTotal > 0 && numPaid > numTotal) {
      errors.initialPayment = "Initial payment cannot exceed Total Fee.";
    }

    setAddErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Add Student Submit
  const handleAddStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAddForm()) {
      return;
    }

    setIsAdding(true);
    try {
      const response = await axios.post("/api/students", {
        name: addForm.name.trim(),
        email: addForm.email.trim().toLowerCase(),
        phone: addForm.phone.trim(),
        college: addForm.college.trim(),
        domain: addForm.domain,
        duration: addForm.duration,
        totalBilling: Number(addForm.totalBilling),
        initialPayment: Number(addForm.initialPayment) || 0,
        paymentMethod: addForm.paymentMethod,
        billingBy: addForm.billingBy.trim() || "Admin",
      });

      if (response.data.success) {
        alert("New Student Profile registered successfully!");
        setIsAddModalOpen(false);
        // Reset Form
        setAddForm({
          name: "",
          email: "",
          phone: "",
          college: "",
          domain: "Web Development",
          duration: "1 Month",
          totalBilling: "",
          initialPayment: "0",
          paymentMethod: "Cash",
          billingBy: "Admin",
        });
        setAddErrors({});
        fetchStudents();
      }
    } catch (err: any) {
      console.error("Add Student Failure:", err);
      const msg = err.response?.data?.error || "Failed to create student profile.";
      alert(msg);
    } finally {
      setIsAdding(false);
    }
  };

  // Open View/Edit Modal
  const handleOpenEditModal = (student: StudentRecord) => {
    setSelectedStudent(student);
    setEditForm({
      name: student.name || "",
      email: student.email || "",
      phone: student.phone || "",
      college: student.college || "",
      domain: student.domain || "Web Development",
      duration: student.duration || "1 Month",
      totalBilling: student.totalBilling || 0,
      certificateStatus: student.certificateStatus || "Pending",
      feesStatus: student.feesStatus || "Pending",
    });
    setIsEditModalOpen(true);
  };

  // Save Edit Updates
  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    setIsSaving(true);
    try {
      const res = await axios.put("/api/students", {
        id: selectedStudent._id,
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        phone: editForm.phone.trim(),
        college: editForm.college.trim(),
        domain: editForm.domain,
        duration: editForm.duration,
        totalBilling: Number(editForm.totalBilling),
        certificateStatus: editForm.certificateStatus,
        feesStatus: editForm.feesStatus,
      });

      if (res.data.success) {
        alert("Student record updated successfully!");
        setIsEditModalOpen(false);
        fetchStudents();
      }
    } catch (err: any) {
      console.error("Error updating student:", err);
      alert(err.response?.data?.error || "Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Student
  const handleDeleteStudent = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete profile for "${name}"? This action cannot be undone.`)) return;

    setIsDeleting(true);
    try {
      const res = await axios.delete(`/api/students?id=${id}`);
      if (res.data.success) {
        alert("Student profile deleted successfully.");
        if (isEditModalOpen) setIsEditModalOpen(false);
        fetchStudents();
      }
    } catch (err: any) {
      console.error("Error deleting student:", err);
      alert(err.response?.data?.error || "Failed to delete profile.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* DIRECTORY HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm">
        <div>
          <h2 className="text-lg font-black text-zinc-900 uppercase tracking-tight">Student Directory</h2>
          <p className="text-xs text-zinc-400 font-medium mt-0.5">
            Total Enrolled Candidates: <span className="font-bold text-zinc-700">{totalStudents}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search Name, Email, Phone..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500 transition-all placeholder:text-zinc-400"
            />
          </div>

          {/* Domain Filter */}
          <div className="relative">
            <select
              value={domainFilter}
              onChange={(e) => { setDomainFilter(e.target.value); setPage(1); }}
              className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500 cursor-pointer appearance-none pr-8"
            >
              {availableDomains.map((dom) => (
                <option key={dom} value={dom}>
                  {dom === "All" ? "All Domains" : dom}
                </option>
              ))}
            </select>
            <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
          </div>

          <button
            onClick={fetchStudents}
            className="p-2 border border-zinc-200 rounded-xl hover:bg-zinc-100 text-zinc-600 transition-colors"
            title="Reload Directory"
          >
            <RefreshCw size={14} className={cn(loading && "animate-spin")} />
          </button>

          {/* 🎯 ADD STUDENT MANUAL BUTTON */}
          <button
            onClick={() => {
              setAddErrors({});
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-all"
          >
            <UserPlus size={15} /> Add Student
          </button>
        </div>
      </div>

      {/* STUDENT TABLE */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center text-zinc-400">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600 mb-2" />
            <p className="text-xs font-bold uppercase tracking-wider">Syncing Student Directory...</p>
          </div>
        ) : students.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/60 text-[10px] font-black uppercase text-zinc-400 tracking-wider">
                  <th className="py-3.5 px-4">S.No</th>
                  <th className="py-3.5 px-4">Student Name</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">College & Domain</th>
                  <th className="py-3.5 px-4">Fee Status</th>
                  <th className="py-3.5 px-4">Cert Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs font-medium text-zinc-700">
                {students.map((st) => (
                  <tr key={st._id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[11px] font-bold text-zinc-400">
                      #{st.sNo || "N/A"}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-zinc-900">{st.name}</p>
                      <p className="text-[10px] font-mono text-zinc-400">{st.doj || "N/A"}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-mono text-zinc-800">{st.phone}</p>
                      <p className="text-[10px] text-zinc-400 truncate max-w-[150px]">{st.email || "No Email"}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-zinc-800 truncate max-w-[180px]">{st.college}</p>
                      <p className="text-[10px] text-emerald-600 font-bold">{st.domain} ({st.duration})</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-[9px] font-black uppercase border tracking-wider",
                          st.pendingAmount <= 0 || st.feesStatus === "Clear" || st.feesStatus === "Fully Paid"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        )}
                      >
                        {st.pendingAmount <= 0 ? "Clear" : `Due: ₹${st.pendingAmount}`}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-[9px] font-black uppercase border tracking-wider",
                          st.certificateStatus === "Issued"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-zinc-100 text-zinc-600 border-zinc-200"
                        )}
                      >
                        {st.certificateStatus || "Pending"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenEditModal(st)}
                        className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ml-auto"
                      >
                        <Eye size={12} /> View / Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-zinc-300 mx-auto" />
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">No Student Records Found</p>
          </div>
        )}

        {/* PAGINATION FOOTER */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-zinc-100 flex justify-between items-center bg-zinc-50/50">
            <p className="text-xs text-zinc-400 font-bold">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-1.5 bg-white border border-zinc-200 rounded-lg disabled:opacity-40 hover:bg-zinc-50 transition-all text-zinc-700"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 bg-white border border-zinc-200 rounded-lg disabled:opacity-40 hover:bg-zinc-50 transition-all text-zinc-700"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* 🎯 MODAL 1: ADD NEW STUDENT PROFILE (STRICT VALIDATIONS, OPTIONAL EMAIL)   */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[999] bg-zinc-950/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="px-6 py-5 bg-zinc-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  <UserPlus size={18} />
                </span>
                <div>
                  <h3 className="text-base font-black uppercase tracking-tight">Manual Student Admission</h3>
                  <p className="text-[11px] text-zinc-400 font-medium">Register a candidate for offline or cash payment</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleAddStudentSubmit} className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              
              {/* Personal Info */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2">
                  1. Candidate Profile Info
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name (REQUIRED) */}
                  <div>
                    <label className="text-[10px] font-bold text-zinc-600 uppercase ml-1">
                      Student Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={addForm.name}
                      onChange={(e) => {
                        setAddForm({ ...addForm, name: e.target.value });
                        if (addErrors.name) setAddErrors({ ...addErrors, name: "" });
                      }}
                      className={cn(
                        "w-full mt-1 px-3.5 py-2.5 bg-zinc-50 border rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white transition-all",
                        addErrors.name ? "border-red-400 bg-red-50/30" : "border-zinc-200 focus:border-emerald-500"
                      )}
                    />
                    {addErrors.name && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{addErrors.name}</p>}
                  </div>

                  {/* Phone (REQUIRED - 10 DIGITS) */}
                  <div>
                    <label className="text-[10px] font-bold text-zinc-600 uppercase ml-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit Phone Number"
                      value={addForm.phone}
                      onChange={(e) => {
                        setAddForm({ ...addForm, phone: e.target.value });
                        if (addErrors.phone) setAddErrors({ ...addErrors, phone: "" });
                      }}
                      className={cn(
                        "w-full mt-1 px-3.5 py-2.5 bg-zinc-50 border rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white transition-all",
                        addErrors.phone ? "border-red-400 bg-red-50/30" : "border-zinc-200 focus:border-emerald-500"
                      )}
                    />
                    {addErrors.phone && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{addErrors.phone}</p>}
                  </div>

                  {/* Email (OPTIONAL) */}
                  <div>
                    <label className="text-[10px] font-bold text-zinc-600 uppercase ml-1">
                      Email Address <span className="text-zinc-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="candidate@gmail.com"
                      value={addForm.email}
                      onChange={(e) => {
                        setAddForm({ ...addForm, email: e.target.value });
                        if (addErrors.email) setAddErrors({ ...addErrors, email: "" });
                      }}
                      className={cn(
                        "w-full mt-1 px-3.5 py-2.5 bg-zinc-50 border rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white transition-all",
                        addErrors.email ? "border-red-400 bg-red-50/30" : "border-zinc-200 focus:border-emerald-500"
                      )}
                    />
                    {addErrors.email && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{addErrors.email}</p>}
                  </div>

                  {/* College / Institution (REQUIRED) */}
                  <div>
                    <label className="text-[10px] font-bold text-zinc-600 uppercase ml-1">
                      College / Institution <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Loyola College"
                      value={addForm.college}
                      onChange={(e) => {
                        setAddForm({ ...addForm, college: e.target.value });
                        if (addErrors.college) setAddErrors({ ...addErrors, college: "" });
                      }}
                      className={cn(
                        "w-full mt-1 px-3.5 py-2.5 bg-zinc-50 border rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white transition-all",
                        addErrors.college ? "border-red-400 bg-red-50/30" : "border-zinc-200 focus:border-emerald-500"
                      )}
                    />
                    {addErrors.college && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{addErrors.college}</p>}
                  </div>
                </div>
              </div>

              {/* Program Details */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2">
                  2. Program Enrollment Parameters
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Domain (REQUIRED) */}
                  <div>
                    <label className="text-[10px] font-bold text-zinc-600 uppercase ml-1">
                      Specialization Domain <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={addForm.domain}
                      onChange={(e) => setAddForm({ ...addForm, domain: e.target.value })}
                      className="w-full mt-1 px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500 transition-all cursor-pointer"
                    >
                      {DEFAULT_DOMAINS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  {/* Duration (REQUIRED) */}
                  <div>
                    <label className="text-[10px] font-bold text-zinc-600 uppercase ml-1">
                      Internship Duration <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={addForm.duration}
                      onChange={(e) => setAddForm({ ...addForm, duration: e.target.value })}
                      className="w-full mt-1 px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500 transition-all cursor-pointer"
                    >
                      {DEFAULT_DURATIONS.map((dur) => (
                        <option key={dur} value={dur}>{dur}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Financial Collection */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2">
                  3. Fee Structure & Cash Collection
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Total Fee (REQUIRED) */}
                  <div>
                    <label className="text-[10px] font-bold text-zinc-600 uppercase ml-1">
                      Total Course Fee (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 1500"
                      value={addForm.totalBilling}
                      onChange={(e) => {
                        setAddForm({ ...addForm, totalBilling: e.target.value });
                        if (addErrors.totalBilling) setAddErrors({ ...addErrors, totalBilling: "" });
                      }}
                      className={cn(
                        "w-full mt-1 px-3.5 py-2.5 bg-zinc-50 border rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white transition-all",
                        addErrors.totalBilling ? "border-red-400 bg-red-50/30" : "border-zinc-200 focus:border-emerald-500"
                      )}
                    />
                    {addErrors.totalBilling && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{addErrors.totalBilling}</p>}
                  </div>

                  {/* Initial Payment Collected */}
                  <div>
                    <label className="text-[10px] font-bold text-emerald-700 uppercase ml-1">
                      Amount Paid Now (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={addForm.initialPayment}
                      onChange={(e) => {
                        setAddForm({ ...addForm, initialPayment: e.target.value });
                        if (addErrors.initialPayment) setAddErrors({ ...addErrors, initialPayment: "" });
                      }}
                      className={cn(
                        "w-full mt-1 px-3.5 py-2.5 bg-emerald-50/50 border rounded-xl text-xs font-bold text-emerald-900 outline-none focus:bg-white transition-all",
                        addErrors.initialPayment ? "border-red-400" : "border-emerald-200 focus:border-emerald-500"
                      )}
                    />
                    {addErrors.initialPayment && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{addErrors.initialPayment}</p>}
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="text-[10px] font-bold text-zinc-600 uppercase ml-1">Payment Method</label>
                    <select
                      value={addForm.paymentMethod}
                      onChange={(e) => setAddForm({ ...addForm, paymentMethod: e.target.value })}
                      className="w-full mt-1 px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500 transition-all cursor-pointer"
                    >
                      <option value="Cash">Cash</option>
                      <option value="GPay">GPay / UPI</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-zinc-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 border border-zinc-200 text-zinc-600 rounded-xl text-xs font-bold hover:bg-zinc-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-50 transition-all"
                >
                  {isAdding ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />} Register Candidate
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* 🎯 MODAL 2: COMPREHENSIVE VIEW & EDIT STUDENT MODAL                        */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      {isEditModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-[999] bg-zinc-950/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-5 bg-zinc-900 text-white flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black uppercase tracking-tight">{selectedStudent.name}</h3>
                  <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                    S.No: #{selectedStudent.sNo || "N/A"}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-medium mt-0.5">
                  Joined on: {selectedStudent.doj || "N/A"}
                </p>
              </div>

              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveChanges} className="p-6 md:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
              
              {/* SECTION 1: PERSONAL & ACADEMIC INFORMATION */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2">
                  1. Personal & Program Details
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">Student Full Name</label>
                    <input
                      type="text"
                      required
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">Email Address</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      placeholder="e.g. student@gmail.com"
                      className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">College / Institution</label>
                    <input
                      type="text"
                      required
                      value={editForm.college}
                      onChange={(e) => setEditForm({ ...editForm, college: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">Specialization Domain</label>
                    <input
                      type="text"
                      required
                      value={editForm.domain}
                      onChange={(e) => setEditForm({ ...editForm, domain: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">Duration</label>
                    <input
                      type="text"
                      required
                      value={editForm.duration}
                      onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">Certificate Status</label>
                    <select
                      value={editForm.certificateStatus}
                      onChange={(e) => setEditForm({ ...editForm, certificateStatus: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Issued">Issued</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: FINANCIAL TRACKING & FEES */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2">
                  2. Financial Status & Adjustments
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">Total Fee (₹)</label>
                    <input
                      type="number"
                      required
                      value={editForm.totalBilling}
                      onChange={(e) => setEditForm({ ...editForm, totalBilling: Number(e.target.value) })}
                      className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500"
                    />
                  </div>

                  <div className="bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100">
                    <p className="text-[9px] font-black uppercase text-emerald-600">Total Collected</p>
                    <p className="text-base font-black text-emerald-700 mt-0.5">
                      ₹{(selectedStudent.totalCollection || 0).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="bg-amber-50/50 p-3 rounded-2xl border border-amber-100">
                    <p className="text-[9px] font-black uppercase text-amber-600">Calculated Balance</p>
                    <p className="text-base font-black text-amber-700 mt-0.5">
                      ₹{Math.max(0, editForm.totalBilling - (selectedStudent.totalCollection || 0)).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">Fees Status</label>
                    <select
                      value={editForm.feesStatus}
                      onChange={(e) => setEditForm({ ...editForm, feesStatus: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Clear">Clear</option>
                      <option value="Fully Paid">Fully Paid</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3: INSTALLMENT LEDGER HISTORY */}
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    3. Payment Installments Ledger ({selectedStudent.installments?.length || 0})
                  </h4>
                </div>

                {selectedStudent.installments && selectedStudent.installments.length > 0 ? (
                  <div className="border border-zinc-200 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-zinc-50 border-b border-zinc-200 text-[9px] font-black uppercase text-zinc-400">
                        <tr>
                          <th className="p-3">Receipt No</th>
                          <th className="p-3">Date</th>
                          <th className="p-3">Paid Amount</th>
                          <th className="p-3">Method</th>
                          <th className="p-3">Billing Staff</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 font-medium text-zinc-700">
                        {selectedStudent.installments.map((inst, idx) => (
                          <tr key={inst.receiptNo || idx} className="hover:bg-zinc-50/50">
                            <td className="p-3 font-mono text-[11px] font-bold text-zinc-900">{inst.receiptNo}</td>
                            <td className="p-3">{inst.date}</td>
                            <td className="p-3 font-bold text-emerald-600">₹{inst.paidAmount?.toLocaleString("en-IN")}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 bg-zinc-100 border border-zinc-200 rounded text-[9px] font-bold">
                                {inst.paymentMethod}
                              </span>
                            </td>
                            <td className="p-3 text-zinc-500">{inst.billingBy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-6 text-center border-2 border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">No Installments Audited Yet</p>
                  </div>
                )}
              </div>

              {/* MODAL FOOTER ACTIONS */}
              <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-center gap-3">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => handleDeleteStudent(selectedStudent._id, selectedStudent.name)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />} Delete Profile
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 sm:flex-initial px-5 py-2.5 border border-zinc-200 text-zinc-600 rounded-xl text-xs font-bold hover:bg-zinc-50 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 sm:flex-initial px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-50 transition-all"
                  >
                    {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Updates
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}