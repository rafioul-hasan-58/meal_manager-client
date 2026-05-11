"use client";

import { useState } from "react";

interface MatchMemberUser {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  profileImage: string;
  role: string;
}

interface MatchMemberData {
  id: string;
  matchId: string;
  userId: string;
  matchRole: "ADMIN" | "MEMBER";
  status: "ACTIVE" | "INACTIVE";
  joinedAt: string;
  user: MatchMemberUser;
}

interface MatchMemberMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface MatchMemberResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta: MatchMemberMeta;
  data: MatchMemberData[];
}

interface MatchMemberProps {
  response?: MatchMemberResponse;
}

const MOCK_RESPONSE: MatchMemberResponse = {
  success: true,
  statusCode: 200,
  message: "Match members fetched successfully!",
  meta: { page: 1, limit: 10, total: 2, totalPage: 1 },
  data: [
    {
      id: "6a004002038b33b333ecc7b2",
      matchId: "6a004002038b33b333ecc7b1",
      userId: "6a004002038b33b333ecc7b0",
      matchRole: "ADMIN",
      status: "ACTIVE",
      joinedAt: "2026-05-10T08:21:22.344Z",
      user: {
        id: "6a004002038b33b333ecc7b0",
        fullName: "Mitu",
        email: "mitu@gmail.com",
        phone: "01712345678",
        profileImage: "",
        role: "USER",
      },
    },
    {
      id: "6a0041d478aa7ec0652a80f7",
      matchId: "6a004002038b33b333ecc7b1",
      userId: "69ff2020e415291e564c91f3",
      matchRole: "MEMBER",
      status: "ACTIVE",
      joinedAt: "2026-05-10T08:29:08.835Z",
      user: {
        id: "69ff2020e415291e564c91f3",
        fullName: "Shoikot",
        email: "shoikot@gmail.com",
        phone: null,
        profileImage: "",
        role: "USER",
      },
    },
  ],
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface MemberCardProps {
  member: MatchMemberData;
  onEdit: (member: MatchMemberData) => void;
  onRemove: (member: MatchMemberData) => void;
  onCopy: (email: string) => void;
}

function MemberCard({ member, onEdit, onRemove, onCopy }: MemberCardProps) {
  const { user, matchRole, status, joinedAt } = member;
  const isAdmin = matchRole === "ADMIN";

  return (
    <div className="bg-[#132030] border border-[#1e3a5f]/60 rounded-2xl p-4 transition-colors hover:border-[#2563eb]/40">
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-11 h-11 min-w-11 rounded-full flex items-center justify-center font-bold text-sm ${
            isAdmin
              ? "bg-[#1e3a5f] text-blue-300"
              : "bg-[#0f2a1a] text-green-400"
          }`}
        >
          {getInitials(user.fullName)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#e2eaf5] font-semibold text-sm truncate mb-1">
            {user.fullName}
          </p>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
              isAdmin
                ? "bg-[#1e3a5f] text-blue-400"
                : "bg-[#0f2a1a] text-green-400"
            }`}
          >
            {isAdmin ? (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 01.75 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-2.403-.707-4.644-1.925-6.525" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            )}
            {isAdmin ? "Admin" : "Member"}
          </span>
        </div>
      </div>

      <div className="h-px bg-[#1e3a5f]/60 my-3" />

      {/* Email */}
      <div className="flex items-center gap-2 mb-2 text-xs text-[#4a6480]">
        <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
        <span className="text-[#7fb3d3] flex-1 truncate">{user.email}</span>
        <button
          onClick={() => onCopy(user.email)}
          className="text-[#2d4a63] hover:text-blue-400 transition-colors ml-auto shrink-0"
          aria-label="Copy email"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
          </svg>
        </button>
      </div>

      {/* Phone */}
      <div className="flex items-center gap-2 mb-1 text-xs text-[#4a6480]">
        <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
        <span className={user.phone ? "text-[#7fb3d3]" : "text-[#2d4a63]"}>
          {user.phone ?? "N/A"}
        </span>
      </div>

      {/* Status */}
      <p className="text-[10.5px] font-bold text-[#2d4a63] uppercase tracking-widest mt-3 mb-1.5">
        Status
      </p>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#0f2a1a] text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
          {status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
        <span className="text-[11px] text-[#2d4a63]">
          Joined {formatDate(joinedAt)}
        </span>
      </div>

      {/* Market Date */}
      <p className="text-[10.5px] font-bold text-[#2d4a63] uppercase tracking-widest mt-3 mb-1.5">
        Market date
      </p>
      <span className="text-xs text-[#2d4a63]">No date set</span>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(member)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-[#4a6480] border border-[#1e3a5f]/80 hover:bg-[#1e3a5f]/40 hover:text-blue-300 transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
          </svg>
          Edit
        </button>
        <button
          onClick={() => onRemove(member)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-red-400 border border-red-900/40 hover:bg-red-900/20 hover:text-red-300 transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          Remove
        </button>
      </div>
    </div>
  );
}

export default function MatchMemberScreen({ response = MOCK_RESPONSE }: MatchMemberProps) {
  const [activeTab, setActiveTab] = useState<"list" | "add">("list");
  const [members, setMembers] = useState<MatchMemberData[]>(response.data);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handleCopy = (email: string) => {
    navigator.clipboard?.writeText(email).catch(() => {});
    showToast(`Copied: ${email}`);
  };

  const handleEdit = (member: MatchMemberData) => {
    showToast(`Edit: ${member.user.fullName}`);
    // TODO: open edit modal/drawer
  };

  const handleRemove = (member: MatchMemberData) => {
    if (!window.confirm(`Remove ${member.user.fullName}?`)) return;
    setMembers((prev) => prev.filter((m) => m.id !== member.id));
    showToast(`${member.user.fullName} removed`);
  };

  return (
    <div className="min-h-screen bg-[#0d1b2e] p-4 font-sans">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h1 className="flex items-center gap-2 text-[#e2eaf5] font-semibold text-base">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
          Match members
        </h1>
        <button
          onClick={() => setActiveTab("add")}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add member
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#132030] rounded-xl p-1 gap-1 mb-4">
        {(["list", "add"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === tab
                ? "bg-[#1e3a5f] text-blue-300"
                : "text-[#4a6480] hover:text-[#7fb3d3]"
            }`}
          >
            {tab === "list" ? "All members" : "Add new"}
          </button>
        ))}
      </div>

      {activeTab === "list" && (
        <>
          {/* Banner */}
          <div className="bg-[#132030] border border-[#1e3a5f]/60 rounded-xl px-4 py-3 mb-4 text-center text-xs text-[#4a6480] leading-relaxed">
            Your mess has{" "}
            <span className="text-orange-400 font-bold">{members.length}</span>{" "}
            members. Each member can log in with their own email &amp; password
            to view their account.
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            {members.length === 0 ? (
              <div className="bg-[#132030] border border-[#1e3a5f]/60 rounded-2xl p-10 text-center">
                <svg className="w-10 h-10 text-[#2d4a63] mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <p className="text-[#2d4a63] text-sm">No members yet</p>
              </div>
            ) : (
              members.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onEdit={handleEdit}
                  onRemove={handleRemove}
                  onCopy={handleCopy}
                />
              ))
            )
            }
          </div>

          {/* Footer */}
          <p className="text-center text-[11px] text-[#2d4a63] pt-4">
            Page {response.meta.page} of {response.meta.totalPage} &nbsp;·&nbsp;{" "}
            {members.length} total
          </p>
        </>
      )}

      {activeTab === "add" && (
        <div className="bg-[#132030] border border-[#1e3a5f]/60 rounded-2xl p-10 text-center">
          <svg className="w-10 h-10 text-[#2d4a63] mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
          <p className="text-[#4a6480] text-sm mb-4">Add a new member to your mess</p>
          <button
            onClick={() => setActiveTab("list")}
            className="text-xs text-[#2d4a63] hover:text-blue-400 transition-colors underline"
          >
            Back to list
          </button>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1e3a5f] text-blue-300 text-xs font-medium px-5 py-2.5 rounded-full border border-blue-700/50 z-50 pointer-events-none whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}