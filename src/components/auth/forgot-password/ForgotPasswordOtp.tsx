"use client";
import { useState } from "react";
import { Loader } from "lucide-react";
import Image from "next/image";
import logo from "@/src/assets/logo.png";
import OtpInput, { OTP_LENGTH } from "@/src/components/lib/OtpInput";
import { useForgotPasswordMutation, useVerifyOtpMutation } from "@/src/redux/features/auth/authApi";
import toast from "react-hot-toast";

interface ForgotPasswordOtpProps {
  email: string;
  onNext: () => void;
  onBack: () => void;
}

const ForgotPasswordOtp = ({ email, onNext, onBack }: ForgotPasswordOtpProps) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
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
    <div className="bg-white lg:rounded-xl lg:shadow-xl w-full max-w-md lg:mx-4 overflow-hidden">
      {/* Top banner */}
      <div className="bg-linear-to-r from-blue-500 to-blue-700 px-8 py-10 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Image className="rounded-sm" src={logo} alt="logo" width={80} height={80} />
        </div>
        <h1 className="text-2xl font-bold text-white">Verify OTP</h1>
        <p className="text-blue-100 text-sm mt-1">Check your inbox for the code</p>
      </div>

      {/* Body */}
      <div className="px-8 py-8">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Enter verification code</h2>
          <p className="text-gray-500 text-sm">
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-blue-600">{email}</span>
          </p>
        </div>

        <OtpInput otp={otp} setOtp={setOtp} error={error} isShaking={isShaking} />

        <div className="text-center mb-6">
          {resendMsg ? (
            <p className="text-green-600 text-sm">{resendMsg}</p>
          ) : (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="cursor-pointer text-blue-600 text-sm hover:underline disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Didn't receive a code? Resend"}
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition"
          >
            Back
          </button>
          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-70"
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