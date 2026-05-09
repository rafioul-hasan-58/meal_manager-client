"use client";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import logo from "@/src/assets/logo.png";
import FormInput from "@/src/components/lib/FormInput";
import { useState } from "react";
import { useForgotPasswordMutation } from "@/src/redux/features/auth/authApi";
import toast from "react-hot-toast";

interface ForgotPasswordEmailProps {
  onNext: (email: string) => void;
}

const ForgotPasswordEmail = ({ onNext }: ForgotPasswordEmailProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    try {
      const response = await forgotPassword({ email }).unwrap();
      console.log("Forgot Password Response:", response);
      if (response.success) {
        toast.success("OTP sent to your email!");
        onNext(email);
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.data?.errorMessages?.[0]?.message ||
        "Failed to send OTP. Please try again.";
      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="bg-white lg:rounded-xl lg:shadow-xl w-full max-w-md lg:mx-4 overflow-hidden">
      {/* Top banner */}
      <div className="bg-linear-to-r from-blue-500 to-blue-700 px-8 py-10 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Image className="rounded-sm" src={logo} alt="logo" width={80} height={80} />
        </div>
        <h1 className="text-2xl font-bold text-white">Forgot Password</h1>
        <p className="text-blue-100 text-sm mt-1">We will send an OTP to your email</p>
      </div>

      {/* Body */}
      <div className="px-8 py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-3">
            <Mail className="w-7 h-7 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Enter your email</h2>
          <p className="text-gray-500 text-sm">We will send a 6-digit verification code to reset your password.</p>
        </div>

        <FormInput
          name="email"
          label="Email Address"
          type="email"
          icon={Mail}
          placeholder="Your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          error={error}
        />

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full mt-5 bg-linear-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-70"
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <>Send OTP <ArrowRight className="w-4 h-4" /></>
          )}
        </button>

        <a
          href="/login"
          className="flex items-center justify-center gap-1 text-sm text-gray-400 mt-4 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </a>
      </div>
    </div>
  );
};

export default ForgotPasswordEmail;