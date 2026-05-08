import {  ArrowRight } from "lucide-react";
import logo from "../../../assets/logo.png"
import Image from "next/image";
interface Props {
    nextStep: () => void;
}

const WelcomeScreen = ({ nextStep }: Props) => {
    return (
        <div className="min-h-screen flex lg:items-center justify-center lg:px-4">
            <div className="bg-white lg:rounded-2xl  lg:shadow-xl w-full max-w-md lg:mx-4 overflow-hidden">
                {/* Top banner */}
                <div className="bg-linear-to-r from-blue-500 to-blue-700 px-8 py-10 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Image className="rounded-sm" src={logo} alt="logo" width={80} height={80} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Meal Management</h1>
                    <p className="text-blue-100 text-sm mt-1">System</p>
                </div>

                {/* Body */}
                <div className="px-8 py-8 text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome Aboard!</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                        Set up your mess account in just a few steps. Manage meals, members,
                        and monthly costs with ease.
                    </p>

                    {/* Steps preview */}
                    <div className="flex justify-center gap-2 mb-8">
                        {["Account", "Mess Info", "Verify", "Review"].map((label, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">
                                    {i + 1}
                                </div>
                                <span className="text-[10px] text-gray-400">{label}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={nextStep}
                        className="w-full bg-linear-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                        Get Started <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-sm text-gray-400 mt-4">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 hover:underline font-medium">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;