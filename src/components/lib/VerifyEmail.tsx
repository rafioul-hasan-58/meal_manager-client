"use client";
import { useState } from "react";
import { useVerifyEmailMutation, useVerifyOtpMutation } from "@/src/redux/features/auth/authApi";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import OtpInput, { OTP_LENGTH } from "@/src/components/lib/OtpInput";
import StepIndicator from "../auth/signup/StepIndicator";

interface VerifyEmailProps {
  email: string;
  nextStep: () => void;
  prevStep: () => void;
}

const VerifyEmail = ({ email, nextStep, prevStep }: VerifyEmailProps) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [resendMsg, setResendMsg] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useVerifyEmailMutation();

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
        toast.success("Email verified successfully!");
        nextStep();
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.data?.errorMessages?.[0]?.message ||
        "Verification failed. Please try again.";
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
        "Failed to resend OTP. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-white lg:rounded-2xl shadow-lg p-8 w-full max-w-md lg:mx-4">
      <StepIndicator currentStep={4} />
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
        <p className="text-gray-500 mt-2 text-sm">
          We sent a 6-digit code to <span className="font-semibold text-blue-600">{email}</span>
        </p>
      </div>

      <OtpInput otp={otp} setOtp={setOtp} error={error} isShaking={isShaking} />

      <div className="text-center mb-6">
        {resendMsg
          ? <p className="text-green-600 text-sm">{resendMsg}</p>
          : (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="cursor-pointer text-blue-600 text-sm hover:underline disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Didn't receive a code? Resend"}
            </button>
          )
        }
      </div>

      <div className="flex gap-3">
        <button
          onClick={prevStep}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition"
        >
          Back
        </button>
        <button
          onClick={handleVerify}
          disabled={isLoading}
          className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isLoading ? <><Loader className="w-4 h-4 animate-spin" />Verifying...</> : <>Verify & Continue</>}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;