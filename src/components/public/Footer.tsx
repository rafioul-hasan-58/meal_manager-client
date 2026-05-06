import Link from "next/link"
import Image from "next/image"
import logo from "../../assets/logo.png"
import { Globe, MessageCircle, Camera, Play } from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-linear-to-r from-blue-500 to-blue-700 text-white mt-20">
            <div className="max-w-7xl mx-auto px-6 py-8">

                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <Image src={logo} alt="App logo" height={38} width={38} className="rounded-sm" />
                        <span className="font-semibold text-white">Meal Management System</span>
                    </div>

                    {/* Links */}
                    <div className="flex gap-6 text-sm text-blue-100">
                        {["Features", "Pricing", "About", "Contact"].map((item) => (
                            <Link key={item} href="#" className="hover:text-white transition-colors duration-200">
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* Socials */}
                    <div className="flex gap-2">
                        {[Globe, MessageCircle, Camera, Play].map((Icon, i) => (
                            <button key={i} className="p-2 rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-200 cursor-pointer">
                                <Icon size={15} />
                            </button>
                        ))}
                    </div>

                </div>

                {/* Bottom */}
                <div className="border-t border-white/20 mt-6 pt-5 text-center text-xs text-blue-100">
                    © {new Date().getFullYear()} Meal Management System. All rights reserved.
                </div>

            </div>
        </footer>
    )
}

export default Footer