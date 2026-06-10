"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, Printer, FileText, Save, Loader2, X, AlertCircle, CheckCircle2 } from "lucide-react";

interface PaymentModalProps {
  programs?: unknown[]; 
  onClose: () => void;
}

interface FormState {
  name: string;
  phone: string;
  college: string;
  billing: string;
  courseName: string; // Program Duration Selector
  domain: string;     // Specialized Domain Selector
  total: string;
  alreadyPaid: string;
  paid: string;
  type: "Full Payment" | "Part Payment";
  method: "Cash" | "GPay";
  txn: string;
}

const DURATION_OPTIONS = ["1 Week", "2 Weeks", "1 Month", "3 Months"] as const;
const DOMAIN_OPTIONS = ["Web development", "Java Full Stack", "Python full stack", "Data analytics", "Data science", "AI & ML", "Digital Marketing", "HR"] as const;
const BILLING_STAFF = ["Preethi", "Senthil Sir", "Amal", "Naresh", "boomika", "Anbu", "Aravindh", "Dhanalakshmi", "Esther"] as const;

const SectionHeader = ({ label }: { label: string }) => (
  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 select-none">
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
    domain: "",
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

  const apiRouteUrl = "/api/payments";

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

    setReceiptNo(`IT-${sequentialSerial}`);
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
      const response = await fetch(`${apiRouteUrl}?phone=${encodeURIComponent(cleanPhone)}`);
      const data = await response.json();
      setPhoneExists(data.exists);
      
      if (data.exists) {
        setForm(f => ({
          ...f,
          name: data.name || f.name,
          college: data.college || f.college,
          domain: data.domain || f.domain,
          courseName: data.courseName || f.courseName,
          total: data.totalBilling ? data.totalBilling.toString() : f.total, 
          alreadyPaid: data.totalAccumulatedPaid > 0 ? data.totalAccumulatedPaid.toString() : "",
          type: "Part Payment"
        }));
      } else {
        setForm(f => ({ ...f, alreadyPaid: "" }));
      }
    } catch (error) {
      console.error("MongoDB aggregate connection failed:", error);
      setPhoneExists(null); 
    } finally {
      setIsCheckingPhone(false);
    }
  };

  const displayDate = currentTimestamp ? currentTimestamp.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "";
  const displayTime = currentTimestamp ? currentTimestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }) : "";

  const handleSave = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.college.trim() || !form.billing || !form.paid || !form.courseName || !form.domain) {
      return alert("Please fulfill all tracking selections and identity profiles.");
    }
    setIsSaving(true);

    try {
      const response = await fetch(apiRouteUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiptNo,
          name: form.name.trim(),
          phone: form.phone.trim(),
          college: form.college.trim(),
          courseName: form.courseName, 
          domain: form.domain,
          totalCoursePayment: numTotal,
          alreadyPaidAmount: numAlreadyPaid,
          paidAmount: numPaid,
          balanceAmount: rawBalance, 
          paymentType: form.type,
          paymentMethod: form.method,
          transactionId: form.method === "GPay" ? form.txn.trim() : "N/A",
          billingBy: form.billing,
          displayDate: displayDate.replace(/\\s+/g, ' '), 
        }),
      });
      const result = await response.json();
      if(result.success) {
        alert(`Payment metrics safely configured under Bill No: ${receiptNo}`);
        onClose();
      } else {
        alert(`Database write dropped: ${result.error}`);
      }
    } catch {
      alert("Network exception occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  const getReceiptHtmlContent = () => {
    const parsedPreviousBalanceRow = numAlreadyPaid > 0 ? `
      <div class="ledger-row" style="color: #64748b;">
        <span>Previously Paid Balance</span>
        <span style="font-weight: 600;">₹${numAlreadyPaid.toLocaleString("en-IN")}</span>
      </div>` : "";

    const parsedMethodInfo = `${form.method} ${form.method === "GPay" && form.txn ? `(${form.txn})` : ""}`;

    return `
      <html>
      <head>
        <title>Receipt_${receiptNo}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @media print, screen {
            @page { size: A5 landscape; margin: 4mm 6mm; }
            * { box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; }
            html, body { margin: 0; padding: 0; width: 210mm; height: 148mm; background: #fff; }
            body { padding: 8px; color: #1e293b; display: flex; align-items: center; justify-content: center; }
            
            #print-root-element-box {
              border: 1.5px solid #cbd5e1 !important;
              border-radius: 12px !important;
              padding: 16px !important;
              width: 100% !important;
              height: 100% !important;
              background: #fff !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: space-between !important;
            }
            .header-row { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #1e293b; padding-bottom: 8px; }
            .office-details { font-size: 8.5px; color: #475569; line-height: 1.4; font-weight: 500; }
            .receipt-title { font-size: 15px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #1e293b; }
            .receipt-id { font-size: 10.5px; font-weight: bold; font-family: monospace; color: #64748b; margin-top: 2px; }
            .main-split { display: grid; grid-template-cols: 1.1fr 0.9fr; gap: 20px; margin-top: 12px; align-items: start; }
            .details-list { display: flex; flex-direction: column; gap: 8px; }
            .field-group { border-bottom: 1px dashed #e2e8f0; padding-bottom: 4px; }
            .field-label { font-size: 8.5px; text-transform: uppercase; color: #a1a1aa; font-weight: 700; tracking-wider; }
            .field-value { font-size: 12px; font-weight: 600; color: #1e293b; margin-top: 1px; }
            .ledger-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 7px; }
            .ledger-row { display: flex; justify-content: space-between; border-b border-dashed border-zinc-200 pb-1; font-size: 11.5px; color: #475569; }
            .ledger-row-last { display: flex; justify-content: space-between; items-center font-bold text-zinc-900; font-size: 13px; border-top: 1.5px solid #1e293b; padding-top: 6px; }
            .paid-accent { font-size: 17px; color: #059669; font-weight: 800; }
            .footer-row { display: flex; justify-content: space-between; font-size: 9px; color: #94a3b8; border-top: 1px solid #f4f4f5; padding-top: 8px; align-items: flex-end; }
            .sig-line { border-top: 1px solid #475569; width: 130px; padding-top: 3px; font-size: 8.5px; font-weight: 700; color: #475569; text-transform: uppercase; text-align: center; margin-top: 25px; }
            .disclaimer-box { border: 1px solid #fee2e2; background: #fff5f5; border-radius: 6px; padding: 6px; text-align: center; font-size: 8px; color: #991b1b; font-weight: 700; text-transform: uppercase; margin-top: 8px; }
          }
        </style>
      </head>
      <body>
        <div id="print-root-element-box">
          <div class="header-row">
            <div>
              <div style="font-size: 18px; font-weight: 800; color: #1e293b; text-transform: uppercase; tracking-tight; margin-bottom: 2px;">iNetz Technologies</div>
              <div class="office-details">
                3rd Floor, K.P Towers, No-159, Arcot Rd, Opp. Nexus Vijaya Mall, Vadapalani, Chennai - 600026<br/>
                <strong>Mob:</strong> 9884441984 | <strong>Email:</strong> info@inetztech.com
              </div>
            </div>
            <div style="text-align: right;">
              <div class="receipt-title">Official Fee Receipt</div>
              <div class="receipt-id">ID: ${receiptNo}</div>
            </div>
          </div>

          <div class="main-split">
            <div class="details-list">
              <div class="field-group">
                <div class="field-label">Student Participant</div>
                <div class="field-value">${form.name || "N/A"} (${form.phone || "N/A"})</div>
              </div>
              <div class="field-group">
                <div class="field-label">Affiliated Institution</div>
                <div class="field-value">${form.college || "N/A"}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Domain Specialized</div>
                <div class="field-value">${form.domain || "N/A"} (${form.courseName || "N/A"})</div>
              </div>
            </div>

            <div class="ledger-box">
              <div class="ledger-row">
                <span>Total Course Fee</span>
                <span style="font-weight: 600; color: #1e293b;">₹${numTotal.toLocaleString("en-IN")}</span>
              </div>
              ${parsedPreviousBalanceRow}
              <div class="ledger-row">
                <span>Payment Processing Mode</span>
                <span style="font-weight: 600; color: #1e293b;">${parsedMethodInfo}</span>
              </div>
              <div class="ledger-row-last">
                <span>Current Amount Paid Now</span>
                <span class="paid-accent">₹${numPaid.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          <div class="print-footer-container" style="display: flex; flex-direction: column;">
            <div class="footer-row">
              <div style="line-height: 1.4;">
                <strong>Timestamp:</strong> ${displayDate} @ ${displayTime}<br/>
                <strong>Gate Auth:</strong> ${form.billing || "SYSTEM"}
              </div>
              <div>
                <div class="sig-line">Authorized Signatory</div>
              </div>
            </div>
            
            <div class="disclaimer-box">
              Important Note: Payment once processed is strictly non-refundable and non-transferable under any circumstances.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  // FIXED: Removed the 'window.close()' timeout loop command line here.
  // This completely stops mobile screens from closing prematurely while processing.
  const handlePrintReceipt = () => {
    if (!form.name.trim() || !form.courseName || !form.domain) {
      return alert("Verify Student Name, course duration, and domain specialization selection.");
    }
    
    const pWin = window.open("", "_blank");
    if (!pWin) return alert("Pop-up window blocked. Please authorize popups for this portal.");

    pWin.document.write(getReceiptHtmlContent());
    pWin.document.write(`
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        };
      </script>
    `);
    pWin.document.close();
  };

  const handleDownloadPdf = () => {
    handlePrintReceipt();
  };

  return (
    <div className="fixed inset-0 z-[999] bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center p-4 print:hidden">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-zinc-100 shadow-2xl flex flex-col max-h-[90vh]">
        
        <div className="px-8 py-5 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50 rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><CreditCard size={16} /></span>
            <h2 className="text-base font-bold text-zinc-900">Fee Registration Dashboard</h2>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors"><X size={18} /></button>
        </div>

        <div className="p-8 overflow-y-auto space-y-6 flex-1">
          <div className="text-right text-xs font-mono text-zinc-400 tracking-tight">
            Assigned Bill ID: <span className="font-semibold text-zinc-700">{receiptNo || "Generating..."}</span>
          </div>

          <div>
            <SectionHeader label="Student Details" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
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

              <AdminInput placeholder="Student Full Name" value={form.name} onChangeText={(v) => setForm(f => ({ ...f, name: v }))} />

              <div className="md:col-span-2">
                <AdminInput placeholder="College / University" value={form.college} onChangeText={(v) => setForm(f => ({ ...f, college: v }))} />
              </div>
              
              <div className="space-y-1">
                <select value={form.domain} onChange={e => setForm(f => ({ ...f, domain: e.target.value }))} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 outline-none focus:border-emerald-500 focus:bg-white transition-all h-[46px] appearance-none">
                  <option value="">-- Choose Course Domain --</option>
                  {DOMAIN_OPTIONS.map(dom => <option key={dom} value={dom}>{dom}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <select value={form.courseName} onChange={e => setForm(f => ({ ...f, courseName: e.target.value }))} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 outline-none focus:border-emerald-500 focus:bg-white transition-all h-[46px] appearance-none">
                  <option value="">-- Choose Course Duration --</option>
                  {DURATION_OPTIONS.map(course => <option key={course} value={course}>{course}</option>)}
                </select>
              </div>

              <div className="md:col-span-2 space-y-1">
                <select value={form.billing} onChange={e => setForm(f => ({ ...f, billing: e.target.value }))} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 outline-none focus:border-emerald-500 focus:bg-white transition-all h-[46px] appearance-none">
                  <option value="">-- Allocated Billing Authority --</option>
                  {BILLING_STAFF.map(staff => <option key={staff} value={staff}>{staff}</option>)}
                </select>
              </div>
            </div>
          </div>

          <hr className="border-zinc-100" />

          <div>
            <SectionHeader label="Payment Specifications" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AdminInput placeholder="Total Cost" type="number" value={form.total} onChangeText={(v) => setForm(f => ({ ...f, total: v }))} />
              <AdminInput placeholder="Already Paid Amount" type="number" value={form.alreadyPaid} onChangeText={(v) => setForm(f => ({ ...f, alreadyPaid: v }))} />
              <AdminInput placeholder="Amount Paid Now" type="number" value={form.paid} onChangeText={(v) => setForm(f => ({ ...f, paid: v }))} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {([
                { l: "Classification", k: "type", o: ["Full Payment", "Part Payment"] }, 
                { l: "Channel Engine", k: "method", o: ["Cash", "GPay"] }
              ] as const).map((cfg, i) => (
                <div key={i} className="bg-zinc-50/50 p-4 rounded-xl border border-zinc-100 space-y-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{cfg.l}</span>
                  <div className="flex gap-4 mt-1">
                    {cfg.o.map(opt => (
                      <label key={opt} className="flex items-center gap-1.5 text-xs font-medium text-zinc-700 cursor-pointer select-none">
                        <input type="radio" checked={form[cfg.k] === opt} onChange={() => setForm(f => ({ ...f, [cfg.k]: opt }))} className="w-4 h-4 text-emerald-600 border-zinc-300 focus:ring-emerald-500 accent-emerald-600" />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {form.method === "GPay" && (
              <div className="mt-4 p-4 bg-emerald-50/10 border border-emerald-100/50 rounded-xl space-y-1.5 animate-in fade-in duration-200">
                <label className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider pl-1">UPI/GPay Transaction Token Reference</label>
                <AdminInput placeholder="Enter TXN ID / Reference Token" value={form.txn} onChangeText={(v) => setForm(f => ({ ...f, txn: v }))} />
              </div>
            )}
          </div>
        </div>

        <div className="px-8 py-4 border-t border-zinc-100 bg-zinc-50 flex gap-3 justify-end items-center rounded-b-3xl">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors">Cancel</button>
          
          <button 
            onClick={handlePrintReceipt} 
            className="px-5 py-2.5 border border-zinc-200 bg-white text-zinc-700 rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-zinc-50 active:bg-zinc-100 transition-colors"
          >
            <Printer size={14} /> Print Receipt
          </button>

          <button 
            onClick={handleDownloadPdf} 
            className="px-5 py-2.5 border border-zinc-200 bg-white text-zinc-700 rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-zinc-50 active:bg-zinc-100 transition-colors"
          >
            <FileText size={14} /> Download PDF
          </button>
          
          <button 
            onClick={handleSave} 
            disabled={isSaving || isCheckingPhone} 
            className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Payment
          </button>
        </div>

      </div>
    </div>
  );
}