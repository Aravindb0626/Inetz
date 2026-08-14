"use client";

import React, { useState, useEffect } from "react";
import { UserPlus, X, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

interface CourseOption {
  _id?: string;
  id?: string;
  title: string;
  name?: string;
  price?: number;
}

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultDomains?: string[];
  defaultDurations?: string[];
}

export default function AddStudentModal({
  isOpen,
  onClose,
  onSuccess,
  defaultDomains = ["Web Development", "Java Full Stack", "Python Programming", "Data Science"],
  defaultDurations = ["15 Days", "1 Month", "2 Months", "3 Months", "6 Months"],
}: AddStudentModalProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [courses, setCourses] = useState<string[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);

  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    domain: "",
    duration: defaultDurations[1] || "1 Month",
    totalBilling: "",
    initialPayment: "0",
    paymentMethod: "Cash",
    billingBy: "Admin",
  });

  const [addErrors, setAddErrors] = useState<Record<string, string>>({});

  // 🎯 Fetch Available Courses Dynamically
  useEffect(() => {
    if (!isOpen) return;

    const fetchCourses = async () => {
      setIsLoadingCourses(true);
      try {
        const response = await axios.get("/api/courses");
        
        // Supports array of strings, or array of objects with title/name
        const rawData = response.data.courses || response.data.data || response.data;
        if (Array.isArray(rawData) && rawData.length > 0) {
          const courseList: string[] = rawData.map((c: CourseOption | string) =>
            typeof c === "string" ? c : c.title || c.name || ""
          ).filter(Boolean);

          setCourses(courseList);
          setAddForm((prev) => ({
            ...prev,
            domain: prev.domain || courseList[0] || defaultDomains[0] || "",
          }));
        } else {
          // Fallback to default domains if API returns empty
          setCourses(defaultDomains);
          setAddForm((prev) => ({
            ...prev,
            domain: prev.domain || defaultDomains[0] || "",
          }));
        }
      } catch (err) {
        console.error("Failed to load courses from API, using fallback defaults:", err);
        setCourses(defaultDomains);
        setAddForm((prev) => ({
          ...prev,
          domain: prev.domain || defaultDomains[0] || "",
        }));
      } finally {
        setIsLoadingCourses(false);
      }
    };

    fetchCourses();
  }, [isOpen, defaultDomains]);

  if (!isOpen) return null;

  const validateAddForm = () => {
    const errors: Record<string, string> = {};

    if (!addForm.name.trim()) {
      errors.name = "Student Name is required.";
    } else if (addForm.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters long.";
    }

    const cleanPhone = addForm.phone.replace(/\D/g, "");
    if (!addForm.phone.trim()) {
      errors.phone = "Mobile Number is required.";
    } else if (cleanPhone.length < 10) {
      errors.phone = "Please enter a valid 10-digit mobile number.";
    }

    if (addForm.email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(addForm.email.trim())) {
        errors.email = "Please enter a valid email address.";
      }
    }

    if (!addForm.college.trim()) {
      errors.college = "College/Institution name is required.";
    }

    if (!addForm.domain.trim()) {
      errors.domain = "Course / Specialization domain is required.";
    }

    if (!addForm.duration.trim()) {
      errors.duration = "Program duration is required.";
    }

    const numTotal = Number(addForm.totalBilling);
    if (!addForm.totalBilling || isNaN(numTotal) || numTotal <= 0) {
      errors.totalBilling = "Please enter a valid fee amount greater than 0.";
    }

    const numPaid = Number(addForm.initialPayment) || 0;
    if (numPaid < 0) {
      errors.initialPayment = "Initial payment cannot be negative.";
    } else if (numTotal > 0 && numPaid > numTotal) {
      errors.initialPayment = "Initial payment cannot exceed Total Fee.";
    }

    setAddErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAddForm()) return;

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
        onClose();
        setAddForm({
          name: "",
          email: "",
          phone: "",
          college: "",
          domain: courses[0] || defaultDomains[0] || "",
          duration: defaultDurations[1] || "1 Month",
          totalBilling: "",
          initialPayment: "0",
          paymentMethod: "Cash",
          billingBy: "Admin",
        });
        setAddErrors({});
        onSuccess();
      }
    } catch (err: any) {
      console.error("Add Student Failure:", err);
      alert(err.response?.data?.error || "Failed to create student profile.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
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
              <p className="text-[11px] text-zinc-400 font-medium">Register a candidate for offline or direct payment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleAddStudentSubmit} className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Section 1: Candidate Info */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2">
              1. Candidate Profile Info
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Section 2: Course & Program Parameters */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2">
              2. Program Enrollment Parameters
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-zinc-600 uppercase ml-1 flex items-center justify-between">
                  <span>Course / Specialization <span className="text-red-500">*</span></span>
                  {isLoadingCourses && (
                    <span className="text-[9px] text-zinc-400 flex items-center gap-1 font-normal lowercase">
                      <Loader2 size={10} className="animate-spin" /> loading courses...
                    </span>
                  )}
                </label>

                <select
                  value={addForm.domain}
                  onChange={(e) => {
                    setAddForm({ ...addForm, domain: e.target.value });
                    if (addErrors.domain) setAddErrors({ ...addErrors, domain: "" });
                  }}
                  disabled={isLoadingCourses}
                  className={cn(
                    "w-full mt-1 px-3.5 py-2.5 bg-zinc-50 border rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white transition-all cursor-pointer",
                    addErrors.domain ? "border-red-400 bg-red-50/30" : "border-zinc-200 focus:border-emerald-500"
                  )}
                >
                  {courses.length === 0 ? (
                    <option value="">No courses available</option>
                  ) : (
                    courses.map((courseTitle) => (
                      <option key={courseTitle} value={courseTitle}>
                        {courseTitle}
                      </option>
                    ))
                  )}
                </select>
                {addErrors.domain && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{addErrors.domain}</p>}
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-600 uppercase ml-1">
                  Internship Duration <span className="text-red-500">*</span>
                </label>
                <select
                  value={addForm.duration}
                  onChange={(e) => setAddForm({ ...addForm, duration: e.target.value })}
                  className="w-full mt-1 px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500 transition-all cursor-pointer"
                >
                  {defaultDurations.map((dur) => (
                    <option key={dur} value={dur}>{dur}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Billing & Payments */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2">
              3. Fee Structure & Collection
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <div>
                <label className="text-[10px] font-bold text-zinc-600 uppercase ml-1">Payment Method</label>
                <select
                  value={addForm.paymentMethod}
                  onChange={(e) => setAddForm({ ...addForm, paymentMethod: e.target.value })}
                  className="w-full mt-1 px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500 transition-all cursor-pointer"
                >
                  <option value="Cash">Cash</option>
                  <option value="GPay">GPay / UPI</option>
                  <option value="NetBanking">Net Banking</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-zinc-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-zinc-200 text-zinc-600 rounded-xl text-xs font-bold hover:bg-zinc-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAdding || isLoadingCourses}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-50 transition-all cursor-pointer"
            >
              {isAdding ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />} Register Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}