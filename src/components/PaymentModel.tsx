"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, Printer, Save, Loader2, X, AlertCircle, CheckCircle2 } from "lucide-react";

interface PaymentModalProps {
  programs?: unknown[]; // Kept for backward compatibility
  onClose: () => void;
}

interface FormState {
  name: string;
  phone: string;
  college: string;
  billing: string;
  courseName: string;
  total: string;
  alreadyPaid: string;
  paid: string;
  type: "Full Payment" | "Part Payment";
  method: "Cash" | "GPay";
  txn: string;
}

const COURSE_OPTIONS = [
  "Web development",
  "Java Full Stack",
  "Python full stack",
  "Data analytics",
  "Data science",
  "AI & ML",
  "Digital Marketing",
  "HR",
] as const;

const BILLING_STAFF = [
  "Preethi",
  "Senthil Sir",
  "Amal",
  "Naresh",
  "boomika",
  "Anbu",
  "Aravindh",
  "Dhanalakshmi",
  "Esther",
] as const;

const SectionHeader = ({ label }: { label: string }) => (
  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">
    {label}
  </h3>
);

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string;
  onChangeText: (val: string) => void;
}

const AdminInput = ({ placeholder, value, onChangeText, type = "text", ...props }: AdminInputProps) => (
  <input
    {...props}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChangeText(e.target.value)}
    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 placeholder:text-zinc-300 outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200"
  />
);

export default function PaymentModal({ onClose }: PaymentModalProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    college: "",
    billing: "",
    courseName: "",
    total: "",
    alreadyPaid: "",
    paid: "",
    type: "Full Payment",
    method: "Cash",
    txn: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);
  const [phoneExists, setPhoneExists] = useState<boolean | null>(null);
  const [receiptNo, setReceiptNo] = useState("");
  const [currentTimestamp, setCurrentTimestamp] = useState<Date | null>(null);

  const webAppUrl = "https://script.google.com/macros/s/AKfycbzILhUcumhC-1aKA3fQwL5O8IZ4AJ_lKEo0WBaLua5NYCnQHso6gM6_gy6JtI6sRRqpbg/exec";

  useEffect(() => {
    const now = new Date();
    setCurrentTimestamp(now);

    const sequentialSerial = 
      now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      "-" +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");

    setReceiptNo(`IA-${sequentialSerial}`);
  }, []);

  const numTotal = Number(form.total) || 0;
  const numAlreadyPaid = Number(form.alreadyPaid) || 0;
  const numPaid = Number(form.paid) || 0;
  const rawBalance = Math.max(0, numTotal - (numAlreadyPaid + numPaid));

  useEffect(() => {
    if (form.type === "Full Payment" && form.total) {
      const remainder = Math.max(0, numTotal - numAlreadyPaid);
      setForm((f) => ({ ...f, paid: remainder.toString() }));
    }
  }, [form.type, form.total, form.alreadyPaid, numTotal, numAlreadyPaid]);

  const checkPhoneExistence = async () => {
    const cleanPhone = form.phone.trim();
    if (cleanPhone.length < 10) return;

    setIsCheckingPhone(true);
    try {
      const response = await fetch(`${webAppUrl}?action=checkPhone&phone=${encodeURIComponent(cleanPhone)}`);
      const data = await response.json();
      
      setPhoneExists(data.exists);
      
      if (data.exists) {
        setForm(f => ({
          ...f,
          name: data.name || f.name,
          college: data.college || f.college,
          courseName: data.courseName || f.courseName,
          alreadyPaid: data.totalAccumulatedPaid > 0 ? data.totalAccumulatedPaid.toString() : "",
          type: "Part Payment"
        }));
      } else {
        setForm(f => ({ ...f, alreadyPaid: "" }));
      }
    } catch (error) {
      console.error("Error communicating with data lookup engine api:", error);
      setPhoneExists(null); 
    } finally {
      setIsCheckingPhone(false);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.college.trim() || !form.billing || !form.paid || !form.courseName) {
      return alert("Please fulfill all track choices and identity boundaries.");
    }
    setIsSaving(true);

    try {
      await fetch(webAppUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          receiptNo,
          name: form.name.trim(),
          phone: form.phone.trim(),
          college: form.college.trim(),
          courseName: form.courseName,
          totalCoursePayment: numTotal,
          alreadyPaidAmount: numAlreadyPaid,
          paidAmount: numPaid,
          balanceAmount: rawBalance, 
          paymentType: form.type,
          paymentMethod: form.method,
          transactionId: form.method === "GPay" ? form.txn.trim() : "N/A",
          billingBy: form.billing,
          dateTime: currentTimestamp ? currentTimestamp.toLocaleString("en-IN") : new Date().toLocaleString("en-IN"),
        }),
      });
      alert(`Payment metrics safely configured under Bill No: ${receiptNo}`);
      onClose();
    } catch {
      alert("Network exception occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  // Mobile Friendly Frame-based Print Implementation
  const handlePrint = () => {
    if (!form.name.trim() || !form.courseName) {
      return alert("Verify core Student Name and targeted course selection.");
    }

    // 1. Create a hidden iframe element
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (!doc) return alert("Printing engine failed to initialize.");

    const displayDate = currentTimestamp ? currentTimestamp.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" }) : "";
    const displayTime = currentTimestamp ? currentTimestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }) : "";

    // 2. Inject raw markup context cleanly into the isolated frame body
    doc.write(`
      <html>
      <head>
        <title>Receipt_${receiptNo}</title>
        <style>
          @page { size: A5 landscape; margin: 4mm 8mm; }
          * { box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; }
          body { margin: 0; padding: 0; color: #1e293b; background: #fff; position: relative; min-height: 100%; -webkit-print-color-adjust: exact; }
          .watermark { position: absolute; top: 48%; left: 50%; transform: translate(-50%, -50%) rotate(-14deg); font-size: 110px; font-weight: 900; color: #f8fafc; z-index: -10; text-transform: lowercase; pointer-events: none; user-select: none; }
          .box { border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 14px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; background: transparent; position: relative; z-index: 10; }
          .h { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #1e293b; padding-bottom: 6px; margin-bottom: 10px; }
          .logo-img { height: 36px; width: auto; object-fit: contain; display: block; margin-bottom: 2px; }
          .office-details { font-size: 8px; color: #475569; max-width: 290px; line-height: 1.3; font-weight: 500; }
          .g { display: grid; grid-template-cols: 1.1fr 1fr; gap: 20px; font-size: 11px; align-items: start; }
          .col { display: flex; flex-direction: column; gap: 7px; }
          .card { background: rgba(248, 250, 252, 0.9); border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px; }
          .row { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px dashed #e2e8f0; }
          .tot { display: flex; justify-content: space-between; margin-top: 8px; padding-top: 8px; border-top: 1.5px solid #1e293b; font-weight: 800; }
          .disclaimer-box { grid-column: span 2; background: #fff5f5; border: 1px solid #fee2e2; border-radius: 8px; padding: 6px 10px; font-size: 8.5px; color: #991b1b; font-weight: 600; text-align: center; text-transform: uppercase; letter-spacing: 0.2px; margin-top: -2px; }
          .f { border-top: 1px solid #e2e8f0; padding-top: 6px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 8.5px; color: #94a3b8; }
          .sig-container { text-align: right; display: flex; flex-direction: column; align-items: flex-end; }
          .sig-line { border-top: 1px solid #475569; width: 130px; padding-top: 3px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; font-size: 8px; }
        </style>
      </head>
      <body>
        <div class="watermark">inetz</div>
        <div class="box">
          <div class="h">
            <div>
              <img src="/Inetz-logo-removebg1.png" alt="iNetz Technologies" class="logo-img" />
              <div class="office-details">
                3rd Floor, K.P Towers, No-159, Arcot Rd, Opp. Nexus Vijaya Mall, Ottagapalayam, A-Block, Vadapalani, Chennai - 600026<br/>
                <b>Mob:</b> 9884441984 | <b>Email:</b> info@inetztech.com
              </div>
            </div>
            <div style="text-align:right; margin-top: 2px;">
              <div style="font-size:14px; font-weight:800; text-transform:uppercase; letter-spacing:0.5px; color:#1e293b;">Official Fee Receipt</div>
              <div style="font-family:monospace; color:#64748b; font-weight:bold; margin-top:2px; font-size:10px;">ID: ${receiptNo}</div>
            </div>
          </div>
          
          <div class="g">
            <div class="col">
              <div><div style="font-size:8.5px; text-transform:uppercase; color:#64748b; font-weight:700;">Student Participant</div><div style="font-size:12px; font-weight:600; color:#1e293b; margin-top:1px;">${form.name} (${form.phone})</div></div>
              <div style="margin-top:4px;"><div style="font-size:8.5px; text-transform:uppercase; color:#64748b; font-weight:700;">Affiliated Institution</div><div style="font-size:12px; font-weight:600; color:#1e293b; margin-top:1px;">${form.college}</div></div>
              <div style="margin-top:4px;"><div style="font-size:8.5px; text-transform:uppercase; color:#64748b; font-weight:700;">Enrolled Specialization</div><div style="font-size:12px; font-weight:600; color:#1e293b; margin-top:1px;">${form.courseName}</div></div>
            </div>
            <div class="card">
              <div class="row"><span>Total Course Fee</span><span style="font-weight:600;">₹${numTotal.toLocaleString("en-IN")}</span></div>
              ${numAlreadyPaid > 0 ? `<div class="row"><span>Previously Paid</span><span style="font-weight: 600; color: #64748b;">₹${numAlreadyPaid.toLocaleString("en-IN")}</span></div>` : ""}
              <div class="row"><span>Payment Channel</span><span style="font-weight:600;">${form.method} ${form.method === "GPay" && form.txn ? `(${form.txn})` : ""}</span></div>
              <div class="tot"><span>Current Paid Amount</span><span style="font-size:15px; color:#059669;">₹${numPaid.toLocaleString("en-IN")}</span></div>
            </div>
            
            <div class="disclaimer-box">
              Important Note: Payment once processed is strictly non-refundable and non-transferable under any circumstances.
            </div>
          </div>
          
          <div class="f">
            <div>Timestamp: ${displayDate} @ ${displayTime} | Gate: ${form.billing || "SYSTEM"}</div>
            <div class="sig-container">
              <div class="sig-line">Authorized Signatory</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    doc.close();

    // 3. Trigger native print handler as soon as the inner iframe elements finish loading
    iframe.onload = () => {
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        
        // 4. Safely discard the dummy node after print window closes
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }, 500);
    };
  };

  return (
    <div className="fixed inset-0 z-[999] bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-zinc-100 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-8 py-5 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50 rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <CreditCard size={16} />
            </span>
            <h2 className="text-base font-bold text-zinc-900">Fee Registration Dashboard</h2>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 overflow-y-auto space-y-6 flex-1">
          <div className="text-right text-xs font-mono text-zinc-400 tracking-tight">
            Assigned Bill ID: <span className="font-semibold text-zinc-700">{receiptNo || "Generating..."}</span>
          </div>

          {/* Section: Student Details */}
          <div>
            <SectionHeader label="Student Details" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Phone Field Input */}
              <div className="relative flex flex-col justify-center">
                <AdminInput 
                  placeholder="Mobile Phone Number" 
                  type="tel"
                  value={form.phone} 
                  onChangeText={(v) => {
                    setPhoneExists(null);
                    setForm(f => ({ ...f, phone: v }));
                  }} 
                  onBlur={checkPhoneExistence}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                  {isCheckingPhone && <Loader2 size={16} className="animate-spin text-zinc-400" />}
                  {!isCheckingPhone && phoneExists === true && (
                    <span className="text-[10px] text-amber-600 font-bold flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                      <AlertCircle size={12} /> Auto-filled
                    </span>
                  )}
                  {!isCheckingPhone && phoneExists === false && (
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                      <CheckCircle2 size={12} /> New Profile
                    </span>
                  )}
                </div>
              </div>

              <AdminInput 
                placeholder="Student Full Name" 
                value={form.name} 
                onChangeText={(v) => setForm(f => ({ ...f, name: v }))} 
              />

              <div className="md:col-span-2">
                <AdminInput 
                  placeholder="College / University" 
                  value={form.college} 
                  onChangeText={(v) => setForm(f => ({ ...f, college: v }))} 
                />
              </div>
              
              <div className="space-y-1">
                <select 
                  value={form.courseName} 
                  onChange={e => setForm(f => ({ ...f, courseName: e.target.value }))}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 outline-none focus:border-emerald-500 focus:bg-white transition-all h-[46px] appearance-none"
                >
                  <option value="">-- Choose Course Specialization --</option>
                  {COURSE_OPTIONS.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <select 
                  value={form.billing} 
                  onChange={e => setForm(f => ({ ...f, billing: e.target.value }))}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 outline-none focus:border-emerald-500 focus:bg-white transition-all h-[46px] appearance-none"
                >
                  <option value="">-- Allocated Billing Authority --</option>
                  {BILLING_STAFF.map(staff => (
                    <option key={staff} value={staff}>{staff}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <hr className="border-zinc-100" />

          {/* Section: Payment Specifications */}
          <div>
            <SectionHeader label="Payment Specifications" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AdminInput 
                placeholder="Total Cost" 
                type="number" 
                value={form.total} 
                onChangeText={(v) => setForm(f => ({ ...f, total: v }))} 
              />
              <AdminInput 
                placeholder="Already Paid Amount" 
                type="number" 
                value={form.alreadyPaid} 
                onChangeText={(v) => setForm(f => ({ ...f, alreadyPaid: v }))} 
              />
              <AdminInput 
                placeholder="Amount Paid Now" 
                type="number" 
                value={form.paid} 
                onChangeText={(v) => setForm(f => ({ ...f, paid: v }))} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {([
                { l: "Classification", k: "type", o: ["Full Payment", "Part Payment"] }, 
                { l: "Channel Engine", k: "method", o: ["Cash", "GPay"] }
              ] as const).map((cfg, i) => (
                <div key={i} className="bg-zinc-50/50 p-4 rounded-xl border border-zinc-100 space-y-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{cfg.l}</span>
                  <div className="flex gap-6 mt-1">
                    {cfg.o.map(opt => (
                      <label key={opt} className="flex items-center gap-2 text-sm font-medium text-zinc-700 cursor-pointer select-none">
                        <input 
                          type="radio" 
                          checked={form[cfg.k] === opt} 
                          onChange={() => setForm(f => ({ ...f, [cfg.k]: opt }))} 
                          className="w-4 h-4 text-emerald-600 border-zinc-300 focus:ring-emerald-500 accent-emerald-600" 
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {form.method === "GPay" && (
              <div className="mt-4 p-4 bg-emerald-50/10 border border-emerald-100/50 rounded-xl space-y-1.5 animate-in fade-in duration-200">
                <label className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider pl-1">
                  UPI/GPay Transaction Token Reference
                </label>
                <AdminInput 
                  placeholder="Enter TXN ID / Reference Token" 
                  value={form.txn} 
                  onChangeText={(v) => setForm(f => ({ ...f, txn: v }))} 
                />
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-4 border-t border-zinc-100 bg-zinc-50 flex gap-3 justify-end items-center rounded-b-3xl">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors">
            Cancel
          </button>
          <button onClick={handlePrint} className="px-5 py-2.5 border border-zinc-200 bg-white text-zinc-700 rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-zinc-50 active:bg-zinc-100 transition-colors">
            <Printer size={14} /> Print Receipt
          </button>
          <button 
            onClick={handleSave} 
            disabled={isSaving || isCheckingPhone} 
            className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
            Save Payment
          </button>
        </div>

      </div>
    </div>
  );
}