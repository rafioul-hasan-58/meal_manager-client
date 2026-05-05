import Image from "next/image"
import logo from "../../assets/logo.png"
import Link from "next/link"
const Nav = () => {
  return (
    <div className="max-w-7xl mx-auto  flex justify-between">
      <aside className="flex items-center gap-5">
        <Image src={logo} alt="appLogo" height={60} width={60} />
        <h1 className="text-2xl font-semibold text-gray-400">Meal Management System</h1>
      </aside>
      <aside className="flex items-center gap-5">
        <Link href="/register">
          <button className="bg-linear-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg font-semibold cursor-pointer">
            Sign Up
          </button>
        </Link>

        <Link href="/login">
          <button className="border-blue-500 border-2 px-6 py-2 rounded-lg text-blue-500 font-semibold cursor-pointer">
            Login
          </button>
        </Link>
      </aside>
    </div>
  )
}

export default Nav
