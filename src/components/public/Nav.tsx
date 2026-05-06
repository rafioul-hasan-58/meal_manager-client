import Image from "next/image"
import logo from "../../assets/logo.png"
import Link from "next/link"
import { RiMenu3Fill } from "react-icons/ri";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
const Nav = () => {
  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-blue-500 to-blue-700 border-b border-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <Image className="rounded-sm" src={logo} alt="App logo" height={50} width={50} />
          <h1 className="text-xl font-semibold text-white hidden md:block">Meal Management System</h1>
        </div>

        {/* mobile menu lg:hidden*/}
        {/* Mobile menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <RiMenu3Fill className="text-3xl text-white" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-blue-400 text-black">
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                <Link href="/register">
                  <SheetClose asChild>
                    <button className="w-full text-left px-4 py-2 rounded hover:bg-blue-600">Sign Up</button>
                  </SheetClose>
                </Link>
                <Link href="/login">
                  <SheetClose asChild>
                    <button className="w-full text-left px-4 py-2 rounded hover:bg-blue-600">Login</button>
                  </SheetClose>
                </Link>
                <Link href="/contact">
                  <SheetClose asChild>
                    <button className="w-full text-left px-4 py-2 rounded hover:bg-blue-600">Contact Us</button>
                  </SheetClose>
                </Link>
              </nav>
              <div className="mt-auto text-center text-sm text-white/70 border-t border-white/20 pt-4">
                © {new Date().getFullYear()} Meal Management System
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {/* dekstop menu */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/register">
            <button className="bg-[#0B1F3A] text-white hover:bg-blue-50 px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 cursor-pointer">
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