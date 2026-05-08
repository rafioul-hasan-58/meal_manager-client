"use client";

import { ArrowRight, Mail, Lock } from "lucide-react";
import logo from "../../assets/logo.png"
import Image from "next/image";
import { useLoginMutation } from "@/src/redux/features/auth/authApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { setCredentials } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/utils/hook";
import { decodeToken } from "@/src/utils/jwtdecoder";
import { ILoginPayload } from "@/src/types/authType";
import FormInput from "../lib/FormInput";

const Login = () => {
    const [formData, setFormData] = useState<ILoginPayload>({
        email: "",
        password: "",

    });
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const target = e.target;
        const name = target.name;
        let value: string | boolean | number = target.value;
        if (target instanceof HTMLInputElement && target.type === "checkbox") {
            value = target.checked;
        }
        if (target instanceof HTMLInputElement && target.type === "number") {
            value = Number(target.value);
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password } = formData;
        try {
            const response = await login({ email, password }).unwrap();
            // handle success, e.g. redirect or store token
            if (response.success) {
                toast.success("User registered successfully!");
                dispatch(setCredentials({ access_token: response.data.accessToken }));
                const decodedToken = decodeToken(response.data.accessToken);
                window.location.href = `/dashboard/${decodedToken.globalRole === "admin" ? "admin" : "user"}`;
            }
            console.log("Login successful:", response);
        } catch (err: any) {
            const errorMessage =
                err?.data?.message ||
                err?.data?.errorMessages?.[0]?.message ||
                "Registration failed. Please try again.";
            console.log("Registration Error:", err);
            toast.error(errorMessage);
        }
    };

    return (
        <div className="bg-white lg:rounded-xl lg:shadow-xl w-full max-w-md lg:mx-4 overflow-hidden">
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
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">Welcome Back!</h2>
                    <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
                </div>

                {/* Fields */}
                {
                    [{ name: "email", label: "Email", type: "email", icon: Mail, placeholder: "Your Email", showPasswordToggle: false },
                    { name: "password", label: "Password", type: "password", icon: Lock, placeholder: "Your Password", showPasswordToggle: true },].map(({ name, label, type, icon, placeholder, showPasswordToggle }) => (
                        <FormInput
                            key={name}
                            name={name}
                            label={label}
                            type={type}
                            icon={icon}
                            placeholder={placeholder}
                            value={formData[name as keyof ILoginPayload] as string}
                            onChange={handleChange}
                            showPasswordToggle={showPasswordToggle}
                        />
                    ))
                }
                <div className="flex gap-4 my-3 justify-end">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline font-medium">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                </div>
                <button onClick={handleLogin} className="w-full bg-linear-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer">
                    {isLoading ? (
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (<>Login < ArrowRight className="w-4 h-4" /></>)}
                </button>

                <p className="text-sm text-gray-400 mt-4 text-center">
                    Donot  have an account?{" "}
                    <a href="/register" className="text-blue-600 hover:underline font-medium">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;