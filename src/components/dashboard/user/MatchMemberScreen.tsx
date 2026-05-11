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

// ── Icons ────────────────────────────────────────────────────────────────────

const IconUsers = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

const IconPlus = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const IconMail = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const IconPhone = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const IconCopy = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
  </svg>
);

const IconEdit = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
  </svg>
);

const IconTrash = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const IconShield = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 01.75 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-2.403-.707-4.644-1.925-6.525" />
  </svg>
);

const IconUser = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
  </svg>
);

const IconCalendar = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

// ── MemberCard ────────────────────────────────────────────────────────────────

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
    <div className="relative bg-[#1e2d45] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 hover:bg-[#223151] transition-all duration-200 group">
      {/* Top accent bar */}
      <div className={`h-[3px] w-full ${isAdmin ? "bg-blue-500" : "bg-emerald-500"}`} />

      <div className="p-5">
        {/* Avatar + Name */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-[15px] shrink-0 ring-2 ${isAdmin ? "bg-blue-500/20 text-blue-300 ring-blue-500/30" : "bg-emerald-500/20 text-emerald-300 ring-emerald-500/30"}`}>
            {getInitials(user.fullName)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white font-semibold text-[15px] truncate mb-1.5">
              {user.fullName}
            </p>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold ring-1 ${isAdmin ? "bg-blue-500/15 text-blue-300 ring-blue-500/30" : "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30"}`}>
              {isAdmin ? <IconShield /> : <IconUser />}
              {isAdmin ? "Admin" : "Member"}
            </span>
          </div>
        </div>

        {/* Contact info */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2.5 group/email">
            <span className="text-slate-500 shrink-0"><IconMail /></span>
            <span className="text-slate-300 text-[13px] flex-1 truncate">{user.email}</span>
            <button
              onClick={() => onCopy(user.email)}
              aria-label="Copy email"
              className="text-slate-600 hover:text-blue-400 transition-colors opacity-0 group-hover/email:opacity-100 shrink-0"
            >
              <IconCopy />
            </button>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-slate-500 shrink-0"><IconPhone /></span>
            <span className={`text-[13px] ${user.phone ? "text-slate-300" : "text-slate-600 italic"}`}>
              {user.phone ?? "N/A"}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.07] mb-4" />

        {/* Status + Joined */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Status</p>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold ring-1 ${status === "ACTIVE" ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/25" : "bg-slate-500/10 text-slate-400 ring-slate-500/25"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status === "ACTIVE" ? "bg-emerald-400" : "bg-slate-500"}`} />
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Joined</p>
            <div className="flex items-center gap-1.5 text-slate-400 text-[12px]">
              <IconCalendar />
              {formatDate(joinedAt)}
            </div>
          </div>
        </div>

        {/* Market date */}
        <div className="mb-5">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Market date</p>
          <span className="text-[12px] text-slate-600 italic">No date set</span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(member)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-medium text-slate-400 bg-white/[0.04] border border-white/[0.08] hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-500/30 active:scale-[0.97] transition-all duration-150"
          >
            <IconEdit /> Edit
          </button>
          <button
            onClick={() => onRemove(member)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-medium text-slate-400 bg-white/[0.04] border border-white/[0.08] hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 active:scale-[0.97] transition-all duration-150"
          >
            <IconTrash /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function MatchMember({ response = MOCK_RESPONSE }: MatchMemberProps) {
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
    // TODO: open edit modal / drawer
  };

  const handleRemove = (member: MatchMemberData) => {
    if (!window.confirm(`Remove ${member.user.fullName}?`)) return;
    setMembers((prev) => prev.filter((m) => m.id !== member.id));
    showToast(`${member.user.fullName} removed`);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 sm:p-6">

      {/* ── Page Header ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
        <div className="flex items-center gap-2.5 text-white">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 ring-1 ring-blue-500/30 flex items-center justify-center text-blue-400">
            <IconUsers />
          </div>
          <h1 className="text-[17px] font-semibold tracking-tight">Match members</h1>
        </div>
        <button
          onClick={() => setActiveTab("add")}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl active:scale-[0.97] transition-all shadow-lg shadow-blue-900/30"
        >
          <IconPlus /> Add member
        </button>
      </div>

      {/* ── Tabs ── */}
      <div className="flex bg-[#1a2842] rounded-xl p-1 gap-1 mb-5 border border-white/[0.06]">
        {(["list", "add"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-md shadow-blue-900/40"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {tab === "list" ? "All members" : "Add new"}
          </button>
        ))}
      </div>

      {/* ── List View ── */}
      {activeTab === "list" && (
        <>
          {/* Banner */}
          <div className="bg-blue-950/40 border border-blue-800/30 rounded-xl px-4 py-3 mb-6 text-sm text-slate-400 text-center leading-relaxed">
            Your mess has{" "}
            <span className="text-orange-400 font-bold">{members.length}</span>{" "}
            members. Each member can log in with their own email &amp; password to view their account.
          </div>

          {/* Cards — 1 col on mobile, 2 col sm+, 3 col lg+ */}
          {members.length === 0 ? (
            <div className="bg-[#1e2d45] border border-white/10 rounded-2xl p-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-800/80 flex items-center justify-center mx-auto mb-4 text-slate-600">
                <IconUsers />
              </div>
              <p className="text-slate-400 text-sm font-medium">No members yet</p>
              <p className="text-slate-600 text-xs mt-1">Add your first member to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {members.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onEdit={handleEdit}
                  onRemove={handleRemove}
                  onCopy={handleCopy}
                />
              ))}
            </div>
          )}

          {/* Pagination footer */}
          <p className="text-center text-xs text-slate-700 mt-6">
            Page {response.meta.page} of {response.meta.totalPage}
            <span className="mx-2 text-slate-800">·</span>
            {members.length} total
          </p>
        </>
      )}

      {/* ── Add View ── */}
      {activeTab === "add" && (
        <div className="bg-[#1e2d45] border border-dashed border-white/10 rounded-2xl p-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/10 ring-1 ring-blue-500/20 flex items-center justify-center mx-auto mb-4 text-blue-500">
            <IconPlus />
          </div>
          <p className="text-slate-300 text-sm font-semibold mb-1">Add a new member</p>
          <p className="text-slate-600 text-xs mb-6">Invite someone to your mess with their email</p>
          <button
            onClick={() => setActiveTab("list")}
            className="text-xs text-slate-600 hover:text-slate-400 transition-colors underline underline-offset-2"
          >
            Back to list
          </button>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1e2d45] text-blue-200 text-xs font-medium px-5 py-2.5 rounded-full border border-blue-700/40 shadow-xl shadow-black/40 z-50 pointer-events-none whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}