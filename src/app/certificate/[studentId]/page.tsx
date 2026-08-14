"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Download, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function CertificatePage() {
  const params = useParams();
  const studentId = params?.studentId as string;

  const [student, setStudent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) return;

    async function fetchCertificateData() {
      try {
        const res = await fetch(`/api/certificate/data?id=${studentId}`);
        const data = await res.json();

        if (data.success && data.student) {
          setStudent(data.student);
        } else {
          setError(data.error || "Certificate record not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load certificate data.");
      } finally {
        setLoading(false);
      }
    }
    fetchCertificateData();
  }, [studentId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-white gap-2 text-sm font-medium">
        <Loader2 className="animate-spin text-amber-500" size={22} /> Loading Official Certificate...
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl max-w-md w-full border border-zinc-200 text-center space-y-4 shadow-xl">
          <AlertCircle size={36} className="text-rose-500 mx-auto" />
          <h2 className="text-lg font-bold text-zinc-900">Certificate Unavailable</h2>
          <p className="text-xs text-zinc-500 leading-relaxed">{error}</p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Dynamic values derived from student database document
  const studentName = student.name || "JOTHY PREETHI S P";
  const domainTrack = student.domain || "Java Full Stack";
  const startDate = student.doj || "02 June 2026";
  const endDate = student.endDate || "20 June 2026";
  const gender = student.gender?.toLowerCase() === "male" ? "male" : "female";
  const pronounSubject = gender === "male" ? "he" : "she";
  const pronounPossessive = gender === "male" ? "his" : "her";

  return (
    <div className="min-h-screen bg-zinc-900 py-8 px-4 flex flex-col items-center justify-center space-y-6">
      
      {/* ────────────────── PRINT MEDIA OVERRIDES ────────────────── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&family=Alex+Brush&display=swap');

        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            margin: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          #certificate-canvas {
            box-shadow: none !important;
            margin: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            border-radius: 0 !important;
            page-break-after: avoid;
          }
        }
      `}</style>

      {/* Top Action Header Bar (Hidden during PDF export/printing) */}
      <div className="w-full max-w-[1050px] flex items-center justify-between no-print text-white">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Return to Admin Console
        </Link>

        <button
          onClick={handlePrint}
          className="px-6 py-2.5 bg-[#C59B27] hover:bg-[#b08722] text-white font-extrabold rounded-xl text-xs inline-flex items-center gap-2 transition-all shadow-lg cursor-pointer"
        >
          <Download size={15} /> Save / Download PDF
        </button>
      </div>

      {/* ────────────────── EXACT CERTIFICATE CANVAS ────────────────── */}
      <div
        id="certificate-canvas"
        className="w-full max-w-[1050px] aspect-[1.414/1] bg-white text-zinc-900 relative flex flex-col justify-between overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        
        {/* 1. TOP-RIGHT GEOMETRIC CORNER POLYGONS */}
        <div className="absolute top-0 right-0 w-[44%] h-[65%] pointer-events-none z-0">
          {/* Outer Main Gold Polygon */}
          <div
            className="absolute top-0 right-0 w-full h-full bg-[#DCAE3F]"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 48% 0)" }}
          />
          {/* Inner Dark Brown Polygon */}
          <div
            className="absolute top-0 right-0 w-[36%] h-[36%] bg-[#221F1F]"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
          />
        </div>

        {/* 2. BOTTOM-LEFT GEOMETRIC CORNER POLYGONS */}
        <div className="absolute bottom-0 left-0 w-[40%] h-[60%] pointer-events-none z-0">
          {/* Outer Main Gold Polygon */}
          <div
            className="absolute bottom-0 left-0 w-full h-full bg-[#C59B27]"
            style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
          />
          {/* Inner Dark Brown Polygon */}
          <div
            className="absolute bottom-0 left-0 w-[32%] h-[32%] bg-[#221F1F]"
            style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
          />
        </div>

        {/* 3. THIN GOLD INNER FRAME BORDER */}
        <div className="absolute inset-8 border border-[#C59B27] pointer-events-none z-10" />

        {/* 4. TOP-LEFT 2026 GOLD AWARD ROSETTE BADGE */}
        <div className="absolute top-10 left-10 z-20 flex flex-col items-center">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Scalloped Gold Ribbed Edge */}
            <div className="absolute inset-0 bg-[#F3C012] rounded-full shadow-md flex items-center justify-center border-2 border-[#C59B27]">
              {/* Dashed Ring */}
              <div className="w-[88%] h-[88%] rounded-full border-2 border-dashed border-[#9E7A1C] flex items-center justify-center">
                {/* Gold Center Disc */}
                <div className="w-[78%] h-[78%] rounded-full bg-gradient-to-b from-[#FDE883] to-[#E5B517] border border-[#9E7A1C] flex items-center justify-center">
                  <span className="text-sm font-black font-mono text-[#6A500E] tracking-tighter">
                    2026
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Ribbon Tails */}
          <div className="flex justify-between w-12 -mt-2">
            <div className="w-5 h-12 bg-[#E5B517] transform -rotate-12 origin-top shadow-sm clip-ribbon" />
            <div className="w-5 h-12 bg-[#E5B517] transform rotate-12 origin-top shadow-sm clip-ribbon" />
          </div>
        </div>

        {/* 5. CERTIFICATE CONTENT AREA */}
        <div className="relative z-20 h-full flex flex-col justify-between p-16 text-center">
          
          {/* LOGO & BRAND HEADLINE */}
          <div className="pt-2 space-y-1">
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-5xl font-black text-[#F36F21] leading-none">i</span>
              <span className="text-5xl font-black text-[#2D2A38] tracking-tight">netz</span>
            </div>
            <p className="text-[11px] font-bold tracking-[0.55em] text-[#2D2A38] uppercase pt-1">
              T E C H N O L O G I E S
            </p>
          </div>

          {/* AWARD STATEMENT */}
          <div className="space-y-3.5 my-auto">
            <div className="space-y-1">
              <h1
                className="text-4xl tracking-[0.25em] text-[#C59B27] font-extrabold"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                CERTIFICATE
              </h1>
              <h2 className="text-sm font-extrabold tracking-[0.22em] text-[#9A7718] uppercase">
                OF INTERNSHIP
              </h2>
            </div>

            <div className="w-80 h-[1.5px] bg-[#C59B27] mx-auto" />

            <p className="text-[11px] font-extrabold text-zinc-800 tracking-wider uppercase pt-1">
              THIS INTERNSHIP PROGRAM CERTIFICATE IS PROUDLY AWARDED TO
            </p>

            {/* STUDENT NAME */}
            <div className="pt-1">
              <h3 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight border-b-2 border-black inline-block px-10 pb-1">
                {studentName}
              </h3>
            </div>

            {/* DESCRIPTION PARAGRAPH */}
            <p className="text-xs md:text-sm text-zinc-700 max-w-2xl mx-auto leading-relaxed pt-2 font-medium">
              For completing the Internship Training on{" "}
              <strong className="text-black font-bold">{domainTrack}</strong> during the period from{" "}
              <strong className="text-black font-bold">{startDate}</strong> to{" "}
              <strong className="text-black font-bold">{endDate}</strong>. During this internship, {pronounSubject} was actively involved in real - time project development, and {pronounPossessive} conduct and performance were found to be satisfactory
            </p>
          </div>

          {/* 6. SIGNATURE & STAMP SEAL (BOTTOM-RIGHT ALIGNED) */}
          <div className="flex justify-end items-end pr-8 pb-3">
            <div className="text-right space-y-1 relative">
              
              {/* SIGNATURE & STAMP OVERLAY */}
              <div className="flex items-center justify-end gap-2 mb-1 relative">
                {/* Handwritten Cursive Signature */}
                <span
                  className="text-4xl text-[#1a2d6d] font-bold tracking-tight transform -rotate-3 select-none"
                  style={{ fontFamily: "'Alex Brush', cursive" }}
                >
                  Senthil Kumar
                </span>

                {/* Circular Rubber Seal Stamp */}
                <div className="w-16 h-16 rounded-full border-2 border-blue-900 flex flex-col items-center justify-center text-blue-900 text-[8px] font-bold leading-none p-1 transform rotate-12 opacity-80 border-dashed">
                  <span className="text-[7px]">Inetz Tech</span>
                  <span className="my-0.5 px-1 bg-blue-900 text-white rounded-[2px] text-[7px]">inetz</span>
                  <span className="text-[6px]">Chennai-600 028</span>
                </div>
              </div>

              {/* CEO NAME & TITLE */}
              <p className="text-xs font-black text-[#C59B27] uppercase tracking-wider">
                C.SENTHIL KUMAR
              </p>
              <p className="text-[10px] font-extrabold text-[#C59B27] uppercase tracking-widest">
                CEO & FOUNDER
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}