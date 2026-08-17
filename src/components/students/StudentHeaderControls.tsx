"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Search, 
  Filter, 
  RefreshCw, 
  UserPlus, 
  Users, 
  Wallet, 
  AlertCircle, 
  Calendar, 
  Clock, 
  RotateCcw,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryData {
  totalStudents: number;
  totalCollected: number;
  totalPending: number;
  duesCount: number;
  clearCount: number;
}

interface ProgramTrack {
  _id?: string;
  title: string;
  duration?: string;
}

interface StudentHeaderControlsProps {
  summary: SummaryData;
  search: string;
  onSearchChange: (value: string) => void;
  domainFilter: string;
  onDomainChange: (value: string) => void;
  availableDomains?: string[];
  durationFilter: string;
  onDurationChange: (value: string) => void;
  availableDurations?: string[];
  fromDate: string;
  onFromDateChange: (value: string) => void;
  toDate: string;
  onToDateChange: (value: string) => void;
  onClearDates: () => void;
  loading: boolean;
  onRefresh: () => void;
  onOpenAddModal: () => void;
}

const DEFAULT_DURATIONS = [
  "All",
  "1 Week",
  "2 Weeks",
  "1 Month",
  "3 Months",
  "6 Months",
];

const DEFAULT_DOMAINS = [
  "All",
  "Web Development",
  "Java Full Stack",
  "Python Development",
  "Data Analytics",
  "Data Science",
  "Android App Development",
  "Cyber Security",
  "UI/UX Design",
];

export default function StudentHeaderControls({
  summary,
  search,
  onSearchChange,
  domainFilter,
  onDomainChange,
  availableDomains,
  durationFilter,
  onDurationChange,
  availableDurations = DEFAULT_DURATIONS,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
  onClearDates,
  loading,
  onRefresh,
  onOpenAddModal,
}: StudentHeaderControlsProps) {
  const [fetchedTracks, setFetchedTracks] = useState<string[]>([]);
  const [loadingTracks, setLoadingTracks] = useState(false);

  // Fetch dynamic tracks from API if not provided by parent
  useEffect(() => {
    if (availableDomains && availableDomains.length > 1) return;

    async function fetchCourseDomains() {
      setLoadingTracks(true);
      try {
        let res = await fetch("/api/tracks");
        if (!res.ok) {
          res = await fetch("/api/programs");
        }

        if (res.ok) {
          const raw = await res.json();
          const list: ProgramTrack[] = Array.isArray(raw)
            ? raw
            : raw.programs || raw.data || [];

          const titles = Array.from(
            new Set(list.map((item) => item.title).filter(Boolean))
          );
          if (titles.length > 0) {
            setFetchedTracks(titles);
          }
        }
      } catch (err) {
        console.error("Failed to load tracks for domain filter:", err);
      } finally {
        setLoadingTracks(false);
      }
    }

    fetchCourseDomains();
  }, [availableDomains]);

  // Combine and deduplicate domains with case-insensitive normalization
  const resolvedDomains = useMemo(() => {
    let sourceList: string[] = [];

    if (availableDomains && availableDomains.length > 1) {
      sourceList = availableDomains;
    } else if (fetchedTracks.length > 0) {
      sourceList = ["All", ...fetchedTracks];
    } else {
      sourceList = DEFAULT_DOMAINS;
    }

    const seen = new Set<string>();
    const unique: string[] = [];

    sourceList.filter(Boolean).forEach((dom) => {
      const normalized = dom.trim().toLowerCase();
      if (!seen.has(normalized)) {
        seen.add(normalized);
        unique.push(dom.trim());
      }
    });

    const hasAll = unique.some((d) => d.toLowerCase() === "all");
    if (!hasAll) {
      unique.unshift("All");
    }

    return unique;
  }, [availableDomains, fetchedTracks]);

  // Case-insensitive match for the current domain filter value
  const matchedDomainValue = useMemo(() => {
    const target = (domainFilter || "all").trim().toLowerCase();
    const found = resolvedDomains.find((d) => d.trim().toLowerCase() === target);
    return found || "All";
  }, [domainFilter, resolvedDomains]);

  // Case-insensitive match for the current duration filter value
  const matchedDurationValue = useMemo(() => {
    const target = (durationFilter || "all").trim().toLowerCase();
    const found = availableDurations.find((d) => d.trim().toLowerCase() === target);
    return found || "All";
  }, [durationFilter, availableDurations]);

  return (
    <div className="space-y-4">
      {/* KPI STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
              Total Enrolled Students
            </p>
            <h3 className="text-2xl font-black text-zinc-900 mt-1">
              {summary.totalStudents.toLocaleString("en-IN")}
            </h3>
          </div>
          <div className="w-12 h-12 bg-zinc-100 text-zinc-700 rounded-2xl flex items-center justify-center">
            <Users size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">
              Total Fees Collected
            </p>
            <h3 className="text-2xl font-black text-emerald-700 mt-1">
              ₹{summary.totalCollected.toLocaleString("en-IN")}
            </h3>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Wallet size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-100/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase text-amber-600 tracking-wider">
              Outstanding Balance
            </p>
            <h3 className="text-2xl font-black text-amber-700 mt-1">
              ₹{summary.totalPending.toLocaleString("en-IN")}
            </h3>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
            <AlertCircle size={22} />
          </div>
        </div>
      </div>

      {/* CONTROLS & FILTERING BAR */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
          <div>
            <h2 className="text-base font-black text-zinc-900 uppercase tracking-tight">
              Student Directory
            </h2>
            <p className="text-xs text-zinc-400 font-medium mt-0.5 flex flex-wrap items-center gap-1">
              <span>Domain:</span>
              <span className="font-bold text-zinc-700">{matchedDomainValue}</span>
              <span className="text-zinc-300">•</span>
              <span>Duration:</span>
              <span className="font-bold text-zinc-700">{matchedDurationValue}</span>
              {(fromDate || toDate) && (
                <span className="ml-1 text-emerald-600 font-bold">
                  ({fromDate || "Start"} to {toDate || "Present"})
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              className="p-2 border border-zinc-200 rounded-xl hover:bg-zinc-100 text-zinc-600 transition-colors cursor-pointer"
              title="Reload Directory"
            >
              <RefreshCw size={14} className={cn(loading && "animate-spin")} />
            </button>

            <button
              onClick={onOpenAddModal}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <UserPlus size={15} /> Add Student
            </button>
          </div>
        </div>

        {/* INPUTS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          
          {/* 1. Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search Name, Email, Phone..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500 transition-all placeholder:text-zinc-400"
            />
          </div>

          {/* 2. Domain Filter Dropdown (Case-Insensitive Both Sides) */}
          <div className="relative">
            <select
              value={matchedDomainValue}
              onChange={(e) => {
                const selectedVal = e.target.value;
                const normalized = selectedVal.trim().toLowerCase();
                onDomainChange(normalized === "all" ? "All" : selectedVal);
              }}
              disabled={loadingTracks}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500 cursor-pointer appearance-none pr-8 disabled:opacity-60"
            >
              {loadingTracks ? (
                <option value="All">Loading courses...</option>
              ) : (
                resolvedDomains.map((dom) => (
                  <option key={dom} value={dom}>
                    {dom.trim().toLowerCase() === "all" ? "All Domains" : dom}
                  </option>
                ))
              )}
            </select>
            {loadingTracks ? (
              <Loader2 className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 animate-spin pointer-events-none" />
            ) : (
              <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
            )}
          </div>

          {/* 3. Duration Filter Dropdown (Case-Insensitive Both Sides) */}
          <div className="relative">
            <select
              value={matchedDurationValue}
              onChange={(e) => {
                const selectedVal = e.target.value;
                const normalized = selectedVal.trim().toLowerCase();
                onDurationChange(normalized === "all" ? "All" : selectedVal);
              }}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500 cursor-pointer appearance-none pr-8"
            >
              {availableDurations.map((dur) => (
                <option key={dur} value={dur}>
                  {dur.trim().toLowerCase() === "all" ? "All Durations" : dur}
                </option>
              ))}
            </select>
            <Clock className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
          </div>

          {/* 4. From Date Picker */}
          <div className="relative flex items-center">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
            <input
              type="date"
              value={fromDate}
              onChange={(e) => onFromDateChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500 transition-all cursor-pointer"
              title="From Admission Date"
            />
          </div>

          {/* 5. To Date Picker + Reset Button */}
          <div className="flex gap-2">
            <div className="relative flex-1 flex items-center">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
              <input
                type="date"
                value={toDate}
                onChange={(e) => onToDateChange(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500 transition-all cursor-pointer"
                title="To Admission Date"
              />
            </div>

            {(fromDate || toDate) && (
              <button
                onClick={onClearDates}
                className="p-2 border border-zinc-200 hover:bg-red-50 hover:border-red-200 text-zinc-500 hover:text-red-600 rounded-xl transition-all cursor-pointer"
                title="Reset Date Range"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}