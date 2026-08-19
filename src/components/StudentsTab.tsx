"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import StudentHeaderControls from "./students/StudentHeaderControls";
import StudentTable, { StudentRecord } from "./students/StudentTable";
import StudentPagination from "./students/StudentPagination";
import AddStudentModal from "./students/AddStudentModal";
import EditStudentModal from "./students/EditStudentModal";

const DEFAULT_FORM_DOMAINS = [
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
  const [availableDomains, setAvailableDomains] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  // Summary Metrics State
  const [summary, setSummary] = useState({
    totalStudents: 0,
    totalCollected: 0,
    totalPending: 0,
    duesCount: 0,
    clearCount: 0,
  });

  // Filter States
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  
  // 🎯 DURATION FILTER STATE
  const [durationFilter, setDurationFilter] = useState("All");
  
  // DATE RANGE STATES
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal States
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams: Record<string, string> = {
        search: debouncedSearch.trim(),
        page: page.toString(),
        limit: "15",
      };

      if (domainFilter !== "All") {
        queryParams.domain = domainFilter;
      }

      // 🎯 PASS DURATION FILTER TO QUERY PARAMS
      if (durationFilter !== "All") {
        queryParams.duration = durationFilter;
      }

      // PASS DATES TO QUERY PARAMS
      if (fromDate) queryParams.fromDate = fromDate;
      if (toDate) queryParams.toDate = toDate;

      const query = new URLSearchParams(queryParams);
      const res = await axios.get(`/api/students?${query.toString()}`);

      if (res.data.success) {
        setStudents(res.data.students || []);

        if (res.data.summary) {
          setSummary(res.data.summary);
        }

        if (Array.isArray(res.data.availableDomains)) {
          setAvailableDomains(res.data.availableDomains);
        }

        if (res.data.pagination) {
          setTotalPages(res.data.pagination.totalPages || 1);
        }
      }
    } catch (err) {
      console.error("Failed to load students:", err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, domainFilter, durationFilter, fromDate, toDate, page]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleDomainChange = (val: string) => {
    setDomainFilter(val);
    setPage(1);
  };

  // 🎯 DURATION CHANGE HANDLER
  const handleDurationChange = (val: string) => {
    setDurationFilter(val);
    setPage(1);
  };

  const handleFromDateChange = (val: string) => {
    setFromDate(val);
    setPage(1);
  };

  const handleToDateChange = (val: string) => {
    setToDate(val);
    setPage(1);
  };

  const handleClearDates = () => {
    setFromDate("");
    setToDate("");
    setPage(1);
  };

  const handleOpenEditModal = (student: StudentRecord) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <StudentHeaderControls
        summary={summary}
        search={search}
        onSearchChange={handleSearchChange}
        domainFilter={domainFilter}
        onDomainChange={handleDomainChange}
        availableDomains={availableDomains}
        
        durationFilter={durationFilter}
        onDurationChange={handleDurationChange}
        availableDurations={["All", ...DEFAULT_DURATIONS]}
        
        fromDate={fromDate}
        onFromDateChange={handleFromDateChange}
        toDate={toDate}
        onToDateChange={handleToDateChange}
        onClearDates={handleClearDates}
        loading={loading}
        onRefresh={fetchStudents}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      <StudentTable
        students={students}
        loading={loading}
        onOpenEditModal={handleOpenEditModal}
      />

      <StudentPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchStudents}
        defaultDomains={DEFAULT_FORM_DOMAINS}
        defaultDurations={DEFAULT_DURATIONS}
      />

      <EditStudentModal
        isOpen={isEditModalOpen}
        student={selectedStudent}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={fetchStudents}
      />
    </div>
  );
}