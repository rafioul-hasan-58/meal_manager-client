import Image from "next/image"
import logo from "../../assets/logo.png"
import Link from "next/link"
import { RiMenu3Fill } from "react-icons/ri";
import { X, LogIn, UserPlus, Phone } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { href: "/register", label: "Sign Up", icon: UserPlus, description: "Create your account" },
  { href: "/login", label: "Login", icon: LogIn, description: "Access your dashboard" },
  { href: "/contact", label: "Contact Us", icon: Phone, description: "Get in touch with us" },
]

const Nav = () => {
  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-blue-500 to-blue-700 border-b border-white/10 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-3">
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
              className="w-75 p-0 border-0 bg-linear-to-b from-blue-600 to-blue-800 text-white flex flex-col overflow-hidden"
            >
              {/* Header */}
              <SheetHeader className="px-6 pt-6 pb-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image className="rounded-sm" src={logo} alt="App logo" height={38} width={38} />
                    <SheetTitle className="text-white text-base font-semibold leading-tight">
                      Meal Management<br />
                      <span className="text-white/60 font-normal text-xs">System</span>
                    </SheetTitle>
                  </div>
                  {/* <SheetClose asChild>
                    <button className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200">
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </SheetClose> */}
                </div>
              </SheetHeader>

              {/* Nav Links */}
              <nav className="flex flex-col gap-2 px-4 py-6 flex-1">
                <p className="text-white/40 text-xs font-semibold uppercase tracking-widest px-2 mb-1">
                  Navigation
                </p>
                {navLinks.map(({ href, label, icon: Icon, description }) => (
                  <SheetClose asChild key={href}>
                    <Link href={href}>
                      <div className="group flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all duration-200 cursor-pointer">
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-200">
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
                ))}
              </nav>

              {/* Footer */}
              <div className="px-6 py-5 border-t border-white/10 bg-black/10">
                <p className="text-center text-white/40 text-xs">
                  © {new Date().getFullYear()} Meal Management System
                </p>
                <p className="text-center text-white/25 text-[10px] mt-0.5">
                  All rights reserved
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/register">
            <button className="bg-[#0B1F3A] text-white hover:bg-[#122947] px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 cursor-pointer shadow-md">
              Sign Up
            </button>
          </Link>
          <Link href="/login">
            <button className="border-2 border-white text-white hover:bg-white/10 px-6 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer">
              Login
            </button>
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default Nav