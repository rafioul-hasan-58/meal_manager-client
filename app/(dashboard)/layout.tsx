"use client";
import { AppSidebar } from "@/src/components/dashboard/Appsidebar";
import { selectUser } from "@/src/redux/features/auth/authSlice";
import { useAppSelector } from "@/src/redux/hooks";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector(selectUser);
  const role = user?.globalRole ?? "USER";

  return (
    <div className="flex h-screen bg-[#0b1120] overflow-hidden">
      <AppSidebar role={role} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}