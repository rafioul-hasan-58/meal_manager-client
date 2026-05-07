import { ArrowRight, Mail, Lock } from "lucide-react";
import logo from "../../assets/logo.png"
import Image from "next/image";

const Login = () => {
    return (
        <div className="bg-white lg:rounded-2xl lg:shadow-xl w-full max-w-md lg:mx-4 overflow-hidden">
            {/* Top banner */}
            <div className="bg-linear-to-r from-blue-500 to-blue-700 px-8 py-10 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Image className="rounded-sm" src={logo} alt="logo" width={80} height={80} />
                </div>
                <h1 className="text-2xl font-bold text-white">Meal Management</h1>
                <p className="text-blue-100 text-sm mt-1">System</p>
            </div>

            {/* Body */}
            <div className="px-8 py-8">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">Welcome Back! 👋</h2>
                    <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
                </div>

                {/* Fields */}
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-gray-800 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <a href="/forgot-password" className="text-xs text-blue-600 hover:underline font-medium">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-gray-800 transition-all"
                            />
                        </div>
                    </div>
                </div>

                <button className="w-full bg-linear-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer">
                    Login <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-xs text-gray-400 mt-4 text-center">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-600 hover:underline font-medium">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;