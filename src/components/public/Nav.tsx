import Image from "next/image"
import logo from "../../assets/logo.png"
import Link from "next/link"

const Nav = () => {
  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-blue-500 to-blue-700 border-b border-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <Image className="rounded-sm" src={logo} alt="App logo" height={50} width={50} />
          <h1 className="text-xl font-semibold text-white">Meal Management System</h1>
        </div>

        <div className="flex items-center gap-4">
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