"use client";

import { useState, useEffect } from "react";
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
    Menu,
    X,
} from "lucide-react";
import Image from "next/image";
import logo from "../../assets/logo.png";

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
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    const visibleItems = NAV_ITEMS.filter((item) => item.roles.includes(role));

    // Close drawer on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const NavLink = ({ item }: { item: NavItem }) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

        return (
            <Link
                href={item.href}
                className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
                    "transition-all duration-150 group",
                    isActive
                        ? "bg-white/20 text-white shadow-sm"
                        : "text-blue-100 hover:bg-white/10 hover:text-white"
                )}
            >
                <Icon className={cn(
                    "shrink-0 w-[18px] h-[18px]",
                    isActive ? "text-white" : "text-blue-200 group-hover:text-white"
                )} />
                <span className="truncate">{item.label}</span>
            </Link>
        );
    };

    return (
        <>
            {/* ─── MOBILE TOP NAVBAR ─── */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-blue-600 border-b border-white/10 shadow-md">
                <div className="flex items-center gap-2.5">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center overflow-hidden">
                        <Image src={logo} alt="logo" width={28} height={28} className="rounded-sm" />
                    </div>
                    <span className="text-white font-semibold text-sm tracking-wide">Meal Matrix</span>
                </div>

                <Link href="/dashboard/profile" className="flex items-center gap-1.5">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/40 border border-white/20 flex items-center justify-center overflow-hidden">
                        {userAvatar ? (
                            <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-4 h-4 text-white" />
                        )}
                    </div>
                </Link>
            </header>

            {/* ─── MOBILE DRAWER BACKDROP ─── */}
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* ─── MOBILE SLIDE-UP BOTTOM DRAWER ─── */}
            <div
                className={cn(
                    "md:hidden fixed bottom-0 left-0 right-0 z-50 bg-blue-600 rounded-t-2xl shadow-2xl",
                    "transition-transform duration-300 ease-out",
                    mobileOpen ? "translate-y-0" : "translate-y-full"
                )}
                style={{ maxHeight: "85vh" }}
            >
                {/* Drawer Handle */}
                <div className="flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 rounded-full bg-white/30" />
                </div>

                {/* Drawer Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <span className="text-white font-semibold text-sm">OPTIONS</span>
                        <span className={cn(
                            "text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded",
                            role === "ADMIN" ? "bg-indigo-500/30 text-indigo-200" : "bg-emerald-500/20 text-emerald-300"
                        )}>
                            {role}
                        </span>
                    </div>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Drawer User Info */}
                <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10">
                    <div className="w-9 h-9 rounded-full bg-indigo-500/30 border border-white/20 flex items-center justify-center overflow-hidden">
                        {userAvatar ? (
                            <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-4 h-4 text-indigo-300" />
                        )}
                    </div>
                    <div>
                        <p className="text-white text-sm font-medium">{userName}</p>
                        <p className="text-blue-300 text-[11px] capitalize">{role.toLowerCase()}</p>
                    </div>
                </div>

                {/* Drawer Nav Items */}
                <nav className="overflow-y-auto px-3 py-2 space-y-0.5" style={{ maxHeight: "calc(85vh - 160px)" }}>
                    {visibleItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium",
                                    "transition-all duration-150",
                                    isActive
                                        ? "bg-white/20 text-white"
                                        : "text-blue-100 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                    isActive ? "bg-white/20" : "bg-white/10"
                                )}>
                                    <Icon className="w-4 h-4 text-white" />
                                </div>
                                <span>{item.label}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                                )}
                            </Link>
                        );
                    })}
                    <div className="h-4" />
                </nav>
            </div>

            {/* ─── DESKTOP SIDEBAR ─── */}
            <TooltipProvider delayDuration={0}>
                <aside
                    className={cn(
                        "hidden md:flex relative flex-col h-screen bg-blue-600 border-r border-white/10",
                        "transition-all duration-300 ease-in-out",
                        collapsed ? "w-[68px]" : "w-60"
                    )}
                >
                    {/* Logo */}
                    <div className={cn(
                        "flex items-center gap-3 px-4 py-5 border-b border-white/10",
                        collapsed && "justify-center px-2"
                    )}>
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center overflow-hidden">
                            <Link href="/">
                                <Image className="cursor-pointer rounded-sm" src={logo} alt="logo" width={300} height={300} />
                            </Link>
                        </div>
                        {!collapsed && (
                            <span className="text-white font-semibold text-sm tracking-wide truncate">Meal Matrix</span>
                        )}
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
                                        isActive
                                            ? "bg-blue-800 text-white"
                                            : "text-slate-200 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <Icon className={cn(
                                        "shrink-0 w-[18px] h-[18px]",
                                        isActive ? "text-white" : "text-slate-200 group-hover:text-white"
                                    )} />
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
                    <div className={cn(
                        "flex items-center gap-3 px-4 py-4 border-t border-white/10",
                        collapsed && "justify-center px-2"
                    )}>
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

            {/* ─── MOBILE CONTENT OFFSET ─── */}
            {/* Add this class to your main content wrapper on mobile: pt-[56px] md:pt-0 */}
        </>
    );
}