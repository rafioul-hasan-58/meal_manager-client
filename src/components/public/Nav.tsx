"use client";

import Image from "next/image"
import logo from "../../assets/logo.png"
import Link from "next/link"
import { RiMenu3Fill } from "react-icons/ri";
import { LogIn, UserPlus, Phone, LogOut, LayoutDashboard, UtensilsCrossed, ShoppingBag, Settings } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAppSelector } from "@/src/redux/hooks";
import { logout, selectUser } from "@/src/redux/features/auth/authSlice";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch } from "@/src/utils/hook";

const guestLinks = [
  { href: "/register", label: "Sign Up", icon: UserPlus, description: "Create your account" },
  { href: "/login", label: "Login", icon: LogIn, description: "Access your dashboard" },
  { href: "/contact", label: "Contact Us", icon: Phone, description: "Get in touch with us" },
]

const userLinks = [
  { href: "/customer/dashboard", icon: LayoutDashboard, label: "Dashboard", desc: "Overview & stats" },
  { href: "/customer/dashboard/meals", icon: UtensilsCrossed, label: "My Meals", desc: "Browse meal plans" },
  { href: "/customer/dashboard/orders", icon: ShoppingBag, label: "My Orders", desc: "Track your orders" },
  { href: "/customer/dashboard/settings", icon: Settings, label: "Settings", desc: "Account preferences" },
]

const Nav = () => {
  const user = useAppSelector(selectUser);
  console.log("current user in nav", user);
  const dispatch = useAppDispatch();
  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-blue-500 to-blue-700 border-b border-white/10 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <Image className="rounded-sm" src={logo} alt="App logo" height={50} width={50} />
          <h1 className="text-xl font-semibold text-white hidden md:block tracking-wide">
            Meal Management System
          </h1>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200">
                <RiMenu3Fill className="text-2xl text-white" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-75 p-0 border-0 bg-[#0B1F3A] text-white flex flex-col overflow-hidden"
            >
              {/* Header */}
              <SheetHeader className="px-5 pt-6 pb-4 border-b border-white/10 bg-linear-to-br from-blue-600/30 to-sky-500/10">
                {user ? (
                  /* ── Logged-in header ── */
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 border-2 border-sky-400 shrink-0">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="bg-blue-700 text-white">S</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <SheetTitle className="text-white text-sm font-semibold leading-tight text-left">
                        Sourav Islam
                      </SheetTitle>
                      <p className="text-sky-400 text-xs italic mt-0.5">Customer</p>
                      <p className="text-white/40 text-xs truncate mt-0.5">sourav@example.com</p>
                    </div>
                  </div>
                ) : (
                  /* ── Guest header ── */
                  <div className="flex items-center gap-3">
                    <Image className="rounded-sm" src={logo} alt="App logo" height={38} width={38} />
                    <SheetTitle className="text-white text-base font-semibold leading-tight text-left">
                      Meal Management<br />
                      <span className="text-white/60 font-normal text-xs">System</span>
                    </SheetTitle>
                  </div>
                )}
              </SheetHeader>

              {/* Nav Links */}
              <nav className="flex flex-col gap-1 px-3 py-5 flex-1">
                <p className="text-white/40 text-xs font-semibold uppercase tracking-widest px-2 mb-2">
                  {user ? "My Account" : "Navigation"}
                </p>

                {user ? (
                  /* ── Logged-in links ── */
                  userLinks.map(({ href, icon: Icon, label, desc }) => (
                    <SheetClose asChild key={href}>
                      <Link href={href}>
                        <div className="group flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/8 active:bg-white/12 transition-colors duration-150 cursor-pointer">
                          <div className="w-9 h-9 rounded-lg bg-sky-500/15 group-hover:bg-sky-500/25 flex items-center justify-center shrink-0 transition-colors duration-150">
                            <Icon className="w-4 h-4 text-sky-400" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-white/90 font-medium text-sm leading-tight">{label}</span>
                            <span className="text-white/40 text-xs">{desc}</span>
                          </div>
                          <svg className="ml-auto w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors duration-150 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    </SheetClose>
                  ))
                ) : (
                  /* ── Guest links ── */
                  guestLinks.map(({ href, label, icon: Icon, description }) => (
                    <SheetClose asChild key={href}>
                      <Link href={href}>
                        <div className="group flex items-center gap-4 px-3 py-3.5 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all duration-200 cursor-pointer">
                          <div className="shrink-0 w-9 h-9 rounded-lg bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-200">
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-white font-medium text-sm">{label}</span>
                            <span className="text-white/50 text-xs">{description}</span>
                          </div>
                          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </SheetClose>
                  ))
                )}
              </nav>

              {/* Footer */}
              <div className="px-3 pb-3 pt-1 border-t border-white/10">
                {user ? (
                  /* ── Logout button ── */
                  <button
                    onClick={() => {/* dispatch logout */ }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors duration-150 group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 flex items-center justify-center shrink-0 transition-colors duration-150">
                      <LogOut className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                ) : (
                  /* ── Copyright ── */
                  <div className="py-3">
                    <p className="text-center text-white/40 text-xs">
                      © {new Date().getFullYear()} Meal Management System
                    </p>
                    <p className="text-center text-white/25 text-[10px] mt-0.5">All rights reserved</p>
                  </div>
                )}
              </div>

            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-10 h-10 lg:w-12 lg:h-12 border-2 border-sky-400 hover:border-sky-300 transition-colors duration-200">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-[#0B1F3A] text-white">CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="mr-4 max-w-[90vw] w-72 lg:w-80 p-0 overflow-hidden border border-sky-500/30 bg-[#0B1F3A] shadow-xl shadow-black/40 rounded-xl">
                <div className="bg-linear-to-br from-blue-600/30 to-sky-500/10 px-5 py-5 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-14 h-14 border-2 border-sky-400 shrink-0">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="bg-blue-700 text-white text-lg">S</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-white font-semibold text-base leading-tight">Sourav Islam</h2>
                      <p className="text-sky-400 text-xs mt-0.5 italic">Customer</p>
                      <p className="text-white/40 text-xs mt-0.5 truncate">sourav@example.com</p>
                    </div>
                  </div>
                </div>

                <ul className="py-2 px-2">
                  {userLinks.map(({ href, icon: Icon, label, desc }) => (
                    <li key={href}>
                      <Link href={href}>
                        <div className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/8 transition-colors duration-150 cursor-pointer">
                          <div className="w-8 h-8 rounded-md bg-sky-500/15 group-hover:bg-sky-500/25 flex items-center justify-center shrink-0 transition-colors duration-150">
                            <Icon className="w-4 h-4 text-sky-400" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-white/90 text-sm font-medium leading-tight">{label}</span>
                            <span className="text-white/35 text-xs">{desc}</span>
                          </div>
                          <svg className="ml-auto w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors duration-150 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="px-3 pb-3 pt-1 border-t border-white/10 mt-1">
                  <button
                    onClick={() => dispatch(logout())}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors duration-150 group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-md bg-red-500/10 group-hover:bg-red-500/20 flex items-center justify-center shrink-0 transition-colors duration-150">
                      <LogOut className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/register">
                <button className="relative px-5 py-2 rounded-lg font-semibold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-200 cursor-pointer backdrop-blur-sm shadow-inner">
                  Sign Up
                </button>
              </Link>
              <Link href="/login">
                <button className="relative px-5 py-2 rounded-lg font-semibold text-sm text-[#0B1F3A] bg-white hover:bg-sky-50 transition-all duration-200 cursor-pointer shadow-md hover:shadow-sky-200/40">
                  Log In
                </button>
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Nav