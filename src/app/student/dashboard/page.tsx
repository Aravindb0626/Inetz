"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

import Sidebar from "./components/Sidebar";
import ProfileTab, { ProfileData } from "./components/ProfileTab";
import ApplicationsTab from "./components/ApplicationsTab";
import CoursesTab from "./components/CoursesTab";
import TransactionsTab from "./components/TransactionsTab";
import PhoneLinkModal from "./components/PhoneLinkModal";

export default function StudentDashboardPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<"profile" | "applications" | "courses" | "transactions">("profile");

  // Loading & Feedback States
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingApps, setLoadingApps] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Student DB Reference ID
  const [studentId, setStudentId] = useState<string>("");

  // Profile Form State strictly typed with ProfileData
  const [profile, setProfile] = useState<ProfileData>({
    _id: "",
    fullName: "",
    email: "",
    phone: "",
    college: "",
    degree: "B.E / B.Tech",
    domainTrack: "Web Development",
    resumeUrl: "",
    githubUrl: "",
    linkedinUrl: "",
  });

  // Dynamic Data States
  const [applications, setApplications] = useState([]);
  const [courses, setCourses] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // 1. Fetch Student Profile & Enrollment Data from /api/student/me or /api/auth/me
  const fetchStudentProfile = useCallback(async () => {
    setLoadingProfile(true);
    try {
      let res = await fetch("/api/auth/me");
      if (!res.ok) return;

      const data = await res.json();
      const userData = data.user;

      if (data.authenticated && userData) {
        // Trigger modal if phone number is missing
        if (!userData.phone || data.needsPhoneLinking) {
          setShowPhoneModal(true);
        } else {
          setShowPhoneModal(false);
        }

        const resolvedStudentId = userData.studentId || userData._id || userData.id || "";
        setStudentId(resolvedStudentId);

        setProfile({
          _id: resolvedStudentId,
          fullName: userData.fullName || userData.name || session?.user?.name || "",
          email: userData.email || session?.user?.email || "",
          phone: userData.phone || "",
          college: userData.college || "",
          degree: userData.degree || "B.E / B.Tech",
          domainTrack: userData.domainTrack || userData.domain || "Web Development",
          resumeUrl: userData.resumeUrl || "",
          githubUrl: userData.githubUrl || "",
          linkedinUrl: userData.linkedinUrl || "",
        });

        if (userData.enrolledCourses) setCourses(userData.enrolledCourses);
        if (userData.transactions) setTransactions(userData.transactions);
      }
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoadingProfile(false);
    }
  }, [session]);

  // 2. Fetch Student Applications
  const fetchApplications = useCallback(async () => {
    setLoadingApps(true);
    try {
      const res = await fetch("/api/student/applications");
      if (!res.ok) return;

      const data = await res.json();
      if (data.success) {
        setApplications(data.applications || []);
      }
    } catch (err) {
      console.error("Failed to load applications:", err);
    } finally {
      setLoadingApps(false);
    }
  }, []);

  // Initial Load on Authentication
  useEffect(() => {
    if (status === "authenticated") {
      fetchStudentProfile();
      fetchApplications();
    }
  }, [status, fetchStudentProfile, fetchApplications]);

  // Refetch Applications whenever the user switches to the Applications Tab
  useEffect(() => {
    if (activeTab === "applications" && status === "authenticated") {
      fetchApplications();
    }
  }, [activeTab, status, fetchApplications]);

  // Handle Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg(null);

    try {
      let res = await fetch("/api/student/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        res = await fetch("/api/auth/me", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
        });
      }

      const data = await res.json();

      if (data.success) {
        setProfileMsg({ type: "success", text: "Profile details updated successfully!" });
        fetchStudentProfile();
      } else {
        setProfileMsg({ type: "error", text: data.error || "Failed to update profile." });
      }
    } catch {
      setProfileMsg({ type: "error", text: "An error occurred while saving profile." });
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row">
      {/* Phone Number Linking Modal */}
      <PhoneLinkModal
        isOpen={showPhoneModal}
        onSuccess={() => {
          setShowPhoneModal(false);
          fetchStudentProfile();
        }}
      />

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userName={profile.fullName}
        userEmail={profile.email}
      />

      {/* Main Tab Content */}
      <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto space-y-6">
        {activeTab === "profile" && (
          <ProfileTab
            profile={profile}
            setProfile={setProfile}
            studentId={studentId}
            loadingProfile={loadingProfile}
            onSaveProfile={handleSaveProfile}
            savingProfile={savingProfile}
            profileMsg={profileMsg}
            setProfileMsg={setProfileMsg}
          />
        )}

        {activeTab === "applications" && (
          <ApplicationsTab applications={applications} loadingApps={loadingApps} />
        )}

        {activeTab === "courses" && (
          <CoursesTab courses={courses} />
        )}

        {activeTab === "transactions" && (
          <TransactionsTab transactions={transactions} />
        )}
      </main>
    </div>
  );
}