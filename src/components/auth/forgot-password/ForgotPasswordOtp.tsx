"use client";
import { useState } from "react";
import { Loader, ShieldCheck } from "lucide-react";
import Image from "next/image";
import logo from "@/src/assets/logo.png";
import OtpInput, { OTP_LENGTH } from "@/src/components/lib/OtpInput";
import { useForgotPasswordMutation, useVerifyForgotOtpMutation } from "@/src/redux/features/auth/authApi";
import toast from "react-hot-toast";

interface ForgotPasswordOtpProps {
  email: string;
  onNext: () => void;
  onBack: () => void;
  setToken: (token: string) => void;
}

const ForgotPasswordOtp = ({ email, setToken, onNext, onBack }: ForgotPasswordOtpProps) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyForgotOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useForgotPasswordMutation();

  const triggerError = (message: string) => {
    setError(message);
    setIsShaking(true);
    setTimeout(() => {
      setOtp(Array(OTP_LENGTH).fill(""));
      setIsShaking(false);
    }, 500);
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      triggerError("Please enter the complete 6-digit code.");
      return;
    }
    try {
      const response = await verifyOtp({ email, otp: code }).unwrap();
      setToken(response.data.accessToken);
      if (response.success) {
        toast.success("OTP verified!");
        onNext();
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.data?.errorMessages?.[0]?.message ||
        "Invalid OTP. Please try again.";
      toast.error(errorMessage);
      triggerError(errorMessage);
    }
  };

  const handleResend = async () => {
    setResendMsg("");
    try {
      const response = await resendOtp({ email }).unwrap();
      if (response.success) {
        setResendMsg("A new code has been sent!");
        setOtp(Array(OTP_LENGTH).fill(""));
        setError("");
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.data?.errorMessages?.[0]?.message ||
        "Failed to resend OTP.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl">
      {/* Top banner */}
      <div className="bg-blue-700 px-8 py-10 text-center">
        <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Image className="rounded-sm" src={logo} alt="logo" width={80} height={80} />
        </div>
        <h1 className="text-2xl font-bold text-white">Verify OTP</h1>
        <p className="text-blue-200 text-sm mt-1">Check your inbox for the code</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 pt-5 px-8">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-medium">✓</div>
          <span className="text-green-400 text-xs font-medium">Email</span>
        </div>
        <div className="flex-1 h-px bg-blue-700 mx-1" />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-medium">2</div>
          <span className="text-blue-400 text-xs font-medium">Verify OTP</span>
        </div>
        <div className="flex-1 h-px bg-[#334155] mx-1" />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#0f172a] border border-[#334155] flex items-center justify-center text-slate-500 text-xs">3</div>
          <span className="text-slate-500 text-xs">Reset</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 py-7">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-900/50 border border-blue-800 mb-3">
            <ShieldCheck className="w-7 h-7 text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-100 mb-1">Enter verification code</h2>
          <p className="text-slate-400 text-sm">
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-blue-400">{email}</span>
          </p>
        </div>

        <OtpInput otp={otp} setOtp={setOtp} error={error} isShaking={isShaking} />

        <div className="text-center mb-6">
          {resendMsg ? (
            <p className="text-green-400 text-sm">{resendMsg}</p>
          ) : (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="cursor-pointer text-blue-400 text-sm hover:text-blue-300 hover:underline transition-colors disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Didn't receive a code? Resend"}
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 py-2.5 rounded-xl border border-[#334155] text-slate-400 font-medium hover:bg-[#0f172a] hover:text-slate-200 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <><Loader className="w-4 h-4 animate-spin" /> Verifying...</>
            ) : (
              <>Verify & Continue</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordOtp;