"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    LayoutDashboard,
    Users,
    UtensilsCrossed,
    Receipt,
    CreditCard,
    FileText,
    Clock,
    Settings,
    ChevronLeft,
    ChevronRight,
    User,
    Bell,
} from "lucide-react";
import Image from "next/image";
import logo from "../../assets/logo.png"
type Role = "ADMIN" | "USER";

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
    roles: Role[];
}

const NAV_ITEMS: NavItem[] = [
    { label: "Dashboard", href: "/dashboard/user", icon: LayoutDashboard, roles: ["ADMIN", "USER"] },
    { label: "Members", href: "/dashboard/admin/members", icon: Users, roles: ["ADMIN"] },
    { label: "Meals", href: "/dashboard/admin/meals", icon: UtensilsCrossed, roles: ["ADMIN"] },
    { label: "Expenses", href: "/dashboard/admin/expenses", icon: Receipt, roles: ["ADMIN"] },
    { label: "Dues", href: "/dashboard/admin/dues", icon: CreditCard, roles: ["ADMIN"] },
    { label: "Reports", href: "/dashboard/admin/reports", icon: FileText, roles: ["ADMIN"] },
    { label: "My Meals", href: "/dashboard/user/meals", icon: UtensilsCrossed, roles: ["USER"] },
    { label: "My Payments", href: "/dashboard/user/payments", icon: CreditCard, roles: ["USER"] },
    { label: "My Dues", href: "/dashboard/user/dues", icon: Receipt, roles: ["USER"] },
    { label: "History", href: "/dashboard/history", icon: Clock, roles: ["ADMIN", "USER"] },
    { label: "Notifications", href: "/dashboard/notifications", icon: Bell, roles: ["ADMIN", "USER"] },
    { label: "Profile", href: "/dashboard/profile", icon: User, roles: ["ADMIN", "USER"] },
    { label: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["ADMIN", "USER"] },
];

interface AppSidebarProps {
    role: Role;
    userName?: string;
    userAvatar?: string;
}

export function AppSidebar({ role, userName = "User", userAvatar }: AppSidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    const visibleItems = NAV_ITEMS.filter((item) => item.roles.includes(role));

    return (
        <TooltipProvider delayDuration={0}>
            <aside
                className={cn(
                    "relative flex flex-col h-screen bg-blue-600 border-r border-white/10",
                    "transition-all duration-300 ease-in-out",
                    collapsed ? "w-17" : "w-60"
                )}
            >
                {/* Logo */}
                <div className={cn("flex items-center gap-3 px-4 py-5 border-b border-white/10", collapsed && "justify-center px-2")}>
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center">
                        <Link href="/">
                            <Image className="cursor-pointer rounded-sm" src={logo} alt="logo" width={300} height={300} />
                        </Link>
                        {/* <UtensilsCrossed className="w-4 h-4 text-white" /> */}
                    </div>
                    {!collapsed && <span className="text-white font-semibold text-sm tracking-wide truncate">Meal Matrix</span>}
                </div>

                {/* Role Badge */}
                {!collapsed && (
                    <div className="px-4 py-2">
                        <span className={cn(
                            "text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded",
                            role === "ADMIN" ? "bg-indigo-500/20 text-indigo-400" : "bg-emerald-500/20 text-emerald-400"
                        )}>
                            {role}
                        </span>
                    </div>
                )}

                {/* Nav Items */}
                <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
                    {visibleItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

                        const linkContent = (
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                                    "transition-all duration-150 group",
                                    collapsed && "justify-center px-2",
                                    isActive ? "bg-blue-800 text-white" : "text-slate-200 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <Icon className={cn("shrink-0 w-4.5 h-4.5", isActive ? "text-white" : "text-slate-200 group-hover:text-white")} />
                                {!collapsed && <span className="truncate">{item.label}</span>}
                            </Link>
                        );

                        return collapsed ? (
                            <Tooltip key={item.href}>
                                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                                <TooltipContent side="right" className="bg-slate-800 text-white border-slate-700">
                                    {item.label}
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <div key={item.href}>{linkContent}</div>
                        );
                    })}
                </nav>

                {/* User Footer */}
                <div className={cn("flex items-center gap-3 px-4 py-4 border-t border-white/10", collapsed && "justify-center px-2")}>
                    <div className="shrink-0 w-7 h-7 rounded-full bg-indigo-500/30 flex items-center justify-center overflow-hidden">
                        {userAvatar ? (
                            <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-4 h-4 text-indigo-300" />
                        )}
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-xs font-medium truncate">{userName}</p>
                            <p className="text-slate-500 text-[10px] capitalize">{role.toLowerCase()}</p>
                        </div>
                    )}
                </div>

                {/* Collapse Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className={cn(
                        "absolute -right-3 top-6 w-6 h-6 rounded-full",
                        "bg-slate-700 hover:bg-indigo-600 border border-white/20",
                        "text-white shadow-md z-10 transition-colors duration-150"
                    )}
                >
                    {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
                </Button>
            </aside>
        </TooltipProvider>
    );
}