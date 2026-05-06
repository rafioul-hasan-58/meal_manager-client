import Link from "next/link";
import analytics from "../../assets/hero-anylitycs.png";
import Image from "next/image";
import { Users, Percent, FileText, BarChart2, ShieldCheck, ArrowRight } from "lucide-react";

const features = [
    {
        icon: <Users size={20} className="text-white" />,
        color: "bg-blue-600",
        title: "Member Management",
        desc: "Add members, manage roles, and track everyone in one place.",
    },
    {
        icon: <Percent size={20} className="text-white" />,
        color: "bg-green-600",
        title: "Meal & Nutrition Tracking",
        desc: "Plan balanced meals and track nutrition with ease.",
    },
    {
        icon: <FileText size={20} className="text-white" />,
        color: "bg-orange-600",
        title: "Expense Management",
        desc: "Track all meal-related expenses and analyze spending.",
    },
    {
        icon: <BarChart2 size={20} className="text-white" />,
        color: "bg-purple-600",
        title: "Smart Analytics",
        desc: "Get real-time insights and reports to make better decisions.",
    },
];

const Hero = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row items-center gap-12">
            {/* Left */}
            <div className="w-full lg:w-1/2 flex flex-col">
                <span className="text-xs text-blue-400 font-semibold tracking-widest uppercase mb-5">
                    Smart meal planning, simplified
                </span>

                <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-5 text-white">
                    Eat well, every day —<br />
                    without the guesswork
                </h1>

                <p className="text-gray-400 text-base mb-8 max-w-sm leading-relaxed">
                    Plan meals, track nutrition, manage expenses,
                    and stay in control — all in one place.
                </p>

                {/* Feature list */}
                <ul className="flex flex-col gap-5 mb-10">
                    {features.map((f) => (
                        <li key={f.title} className="flex items-start gap-4">
                            <div className={`${f.color} p-2.5 rounded-lg shrink-0`}>
                                {f.icon}
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">{f.title}</p>
                                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Buttons */}
                <div className="flex gap-4 flex-wrap mb-6">
                    <Link href="/register">
                        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-7 py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer">
                            Get Started <ArrowRight size={16} />
                        </button>
                    </Link>
                    <Link href="/login">
                        <button className="border border-blue-500 hover:bg-blue-500/10 px-8 py-3 rounded-lg text-blue-400 font-semibold transition-all duration-200 cursor-pointer">
                            Login
                        </button>
                    </Link>
                </div>

                {/* Trust badge */}
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <ShieldCheck size={16} className="text-gray-500" />
                    <span>Secure. Reliable. Built for mess managers and communities.</span>
                </div>
            </div>

            {/* Right — dashboard preview */}
            <div className="w-full lg:w-1/2">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20">
                    <Image
                        src={analytics}
                        alt="Analytics dashboard preview"
                        className="w-full h-auto object-cover"
                        priority
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;