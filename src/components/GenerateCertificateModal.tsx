"use client";

import React, { useState } from "react";
import { 
  X, 
  Award, 
  Download, 
  Mail, 
  ExternalLink, 
  Loader2, 
  CheckCircle, 
  AlertCircle 
} from "lucide-react";

interface GenerateCertificateModalProps {
  isOpen: boolean;
  student: {
    _id: string;
    name: string;
    email: string;
    domain: string;
    duration?: string;
  } | null;
  onClose: () => void;
  onRefresh?: () => void;
}

export default function GenerateCertificateModal({
  isOpen,
  student,
  onClose,
  onRefresh,
}: GenerateCertificateModalProps) {
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  if (!isOpen || !student) return null;

  const handleDownloadView = () => {
    window.open(`/certificate/${student._id}`, "_blank");
  };

  const handleSendEmail = async () => {
    setSendingEmail(true);
    setEmailStatus(null);

    try {
      const res = await fetch("/api/admin/send-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: student._id }),
      });

      const data = await res.json();

      if (data.success) {
        setEmailStatus({
          type: "success",
          message: `Certificate successfully emailed to ${student.email}`,
        });
        if (onRefresh) onRefresh();
      } else {
        setEmailStatus({
          type: "error",
          message: data.error || "Failed to send email.",
        });
      }
    } catch {
      setEmailStatus({
        type: "error",
        message: "Network error occurred while sending email.",
      });
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-zinc-100 relative animate-in fade-in zoom-in-95 duration-150">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center shrink-0">
            <Award size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-900">Certificate Options</h2>
            <p className="text-xs text-zinc-500">
              Download/print PDF or email certificate directly to the student
            </p>
          </div>
        </div>

        <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-zinc-400 font-medium">Student Name:</span>
            <strong className="text-zinc-900 font-bold">{student.name}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400 font-medium">Email Destination:</span>
            <strong className="text-zinc-900 font-bold">{student.email || "No email provided"}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400 font-medium">Domain Track:</span>
            <span className="text-emerald-700 font-bold uppercase">{student.domain}</span>
          </div>
        </div>

        {emailStatus && (
          <div
            className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              emailStatus.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {emailStatus.type === "success" ? (
              <CheckCircle size={16} className="text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle size={16} className="text-rose-600 shrink-0" />
            )}
            <span>{emailStatus.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={handleDownloadView}
            className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Download size={15} /> View / Print PDF <ExternalLink size={12} className="opacity-70" />
          </button>

          <button
            type="button"
            onClick={handleSendEmail}
            disabled={sendingEmail || !student.email}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-sm"
          >
            {sendingEmail ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Sending Email...
              </>
            ) : (
              <>
                <Mail size={15} /> Send to Email
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}