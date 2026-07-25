// receiptTemplate.ts

interface ReceiptDataInput {
  receiptNo: string;
  displayDate: string;
  displayTime?: string;
  name: string;
  phone: string;
  college: string;
  domain: string;
  courseName: string;
  numTotal: number;
  numAlreadyPaid: number;
  numPaid: number;
  method: string;
  txn: string;
  billing: string;
}

export const generateReceiptHtml = (data: ReceiptDataInput): string => {
  // Explicitly rendering the raw HTML block conditionally beforehand to prevent parsing glitches
  let previousBalanceRowHtml = "";
  if (data.numAlreadyPaid && data.numAlreadyPaid > 0) {
    previousBalanceRowHtml = `
      <div class="ledger-row" style="color: #64748b;">
        <span>Previously Paid Balance</span>
        <span style="font-weight: 600;">₹${data.numAlreadyPaid.toLocaleString("en-IN")}</span>
      </div>
    `;
  }

  const parsedMethodInfo = `${data.method} ${data.method === "GPay" && data.txn && data.txn !== "N/A" ? `(${data.txn})` : ""}`;
  const rawTimeDisplay = data.displayTime ? `@ ${data.displayTime}` : "";

  return `
    <html>
    <head>
      <title>Receipt_${data.receiptNo}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @page { size: A5 landscape; margin: 4mm 6mm; }
        * { box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; }
        body { margin: 0; padding: 5px; color: #1e293b; background: #fff; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        
        #print-root-element-box {
          border: 1.5px solid #cbd5e1 !important;
          border-radius: 12px !important;
          padding: 14px !important;
          width: 100% !important;
          background: #fff !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          min-height: 132mm;
        }
        .header-row { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #1e293b; padding-bottom: 6px; }
        .office-details { font-size: 8px; color: #475569; line-height: 1.4; font-weight: 500; }
        .receipt-title { font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #1e293b; }
        .receipt-id { font-size: 10px; font-weight: bold; font-family: monospace; color: #64748b; margin-top: 2px; }
        .main-split { display: grid; grid-template-cols: 1.1fr 0.9fr; gap: 16px; margin-top: 10px; align-items: start; }
        .details-list { display: flex; flex-direction: column; gap: 6px; }
        .field-group { border-bottom: 1px dashed #e2e8f0; padding-bottom: 3px; }
        .field-label { font-size: 8px; text-transform: uppercase; color: #a1a1aa; font-weight: 700; tracking-wider; }
        .field-value { font-size: 11px; font-weight: 600; color: #1e293b; margin-top: 1px; }
        .ledger-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px; display: flex; flex-direction: column; gap: 6px; }
        .ledger-row { display: flex; justify-content: space-between; text-xs text-zinc-600 border-b border-dashed border-zinc-200 pb-1; font-size: 11px; color: #475569; }
        .ledger-row-last { display: flex; justify-content: space-between; align-items: center; pt-1 font-bold text-zinc-900; font-size: 12px; border-top: 1.5px solid #1e293b; padding-top: 4px; }
        .paid-accent { font-size: 16px; color: #059669; font-weight: 800; }
        .footer-row { display: flex; justify-content: space-between; font-size: 8.5px; color: #94a3b8; border-top: 1px solid #f4f4f5; padding-top: 6px; align-items: center; margin-top: auto; }
        .sig-line { border-top: 1px solid #475569; width: 125px; padding-top: 2px; font-size: 8px; font-weight: 700; color: #475569; text-transform: uppercase; text-align: center; margin-top: 35px; }
        .disclaimer-box { border: 1px solid #fee2e2; background: #fff5f5; border-radius: 6px; padding: 5px; text-align: center; font-size: 7.5px; color: #991b1b; font-weight: 700; text-transform: uppercase; margin-top: 8px; }
      </style>
    </head>
    <body>
      <div id="print-root-element-box">
        <div class="header-row">
          <div>
            <img src="/Inetz-logo-removebg1.png" alt="iNetz Technologies" style="height: 32px; width: auto; display: block; margin-bottom: 2px;" />
            <div class="office-details">
              3rd Floor, K.P Towers, No-159, Arcot Rd, Opp. Nexus Vijaya Mall, Vadapalani, Chennai - 600026<br/>
              <strong>Mob:</strong> 9884441984 | <strong>Email:</strong> info@inetztech.com
            </div>
          </div>
          <div style="text-align: right;">
            <div class="receipt-title">Official Fee Receipt</div>
            <div class="receipt-id">ID: ${data.receiptNo}</div>
          </div>
        </div>

        <div class="main-split">
          <div class="details-list">
            <div class="field-group">
              <div class="field-label">Student Participant</div>
              <div class="field-value">${data.name || "N/A"} (${data.phone || "N/A"})</div>
            </div>
            <div class="field-group">
              <div class="field-label">Affiliated Institution</div>
              <div class="field-value">${data.college || "N/A"}</div>
            </div>
            <div class="field-group">
              <div class="field-label">Domain Specialized</div>
              <div class="field-value">${data.domain || "N/A"} (${data.courseName || "N/A"})</div>
            </div>
          </div>

          <div class="ledger-box">
            <div class="ledger-row">
              <span>Total Course Fee</span>
              <span style="font-weight: 600; color: #1e293b;">₹${data.numTotal.toLocaleString("en-IN")}</span>
            </div>
            ${previousBalanceRowHtml}
            <div class="ledger-row">
              <span>Payment Processing Mode</span>
              <span style="font-weight: 600; color: #1e293b;">${parsedMethodInfo}</span>
            </div>
            <div class="ledger-row-last">
              <span>Current Amount Paid Now</span>
              <span class="paid-accent">₹${data.numPaid.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        <div class="print-footer-container" style="display: flex; flex-direction: column; margin-top: auto;">
          <div class="footer-row">
            <div style="line-height: 1.4;">
              <strong>Timestamp:</strong> ${data.displayDate} ${rawTimeDisplay}<br/>
              <strong>Gate Auth:</strong> ${data.billing || "SYSTEM"}
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

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
            setTimeout(function() { window.close(); }, 500);
          }, 300);
        };
      </script>
    </body>
    </html>
  `;
};