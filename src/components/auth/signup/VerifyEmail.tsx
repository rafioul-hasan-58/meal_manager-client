"use client";
import { useState, useRef } from "react";
import StepIndicator from "./StepIndicator";
import { useVerifyEmailMutation, useVerifyOtpMutation } from "@/src/redux/features/auth/authApi";
import { Loader, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

interface VerifyEmailProps {
  email: string;
  nextStep: () => void;
  prevStep: () => void;
}

const OTP_LENGTH = 6;

const VerifyEmail = ({ email, nextStep, prevStep }: VerifyEmailProps) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [resendMsg, setResendMsg] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useVerifyEmailMutation();

  const triggerError = (message: string) => {
    setError(message);
    setIsShaking(true);
    setTimeout(() => {
      setOtp(Array(OTP_LENGTH).fill(""));
      setIsShaking(false);
      inputRefs.current[0]?.focus();
    }, 500);
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);
    setError("");
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (pasted.length === OTP_LENGTH) {
      setOtp(pasted.split(""));
      inputRefs.current[OTP_LENGTH - 1]?.focus();
    }
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
        inputRefs.current[0]?.focus();
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
    <div className="bg-[#1e293b] border border-[#334155] rounded-2xl shadow-2xl w-full max-w-md lg:mx-4 overflow-hidden">
      {/* Shake keyframe */}
      <style>{`
        @keyframes shake {
          0%   { transform: translateX(0); }
          15%  { transform: translateX(-6px); }
          30%  { transform: translateX(6px); }
          45%  { transform: translateX(-6px); }
          60%  { transform: translateX(6px); }
          75%  { transform: translateX(-4px); }
          90%  { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }
        .shake { animation: shake 0.6s ease; }
      `}</style>

      {/* Header */}
      <div className="bg-blue-700 px-8 pt-6 pb-4">
        <StepIndicator currentStep={4} />
        <h2 className="text-slate-100 text-lg font-semibold text-center">Verify Your Email</h2>
        <p className="text-blue-200 text-xs text-center mt-0.5">Enter the code we sent you</p>
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

        {/* OTP Inputs */}
        <div
          className={`flex justify-center gap-3 mb-4 ${isShaking ? "shake" : ""}`}
          onPaste={handlePaste}
        >
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-11 h-12 text-center text-lg font-semibold rounded-lg outline-none transition-colors border-2
                ${error
                  ? "border-red-500 bg-red-900/20 text-red-400"
                  : digit
                    ? "border-blue-500 bg-blue-900/30 text-blue-400"
                    : "border-[#334155] bg-[#0f172a] text-slate-100"
                }
                focus:border-blue-500`}
            />
          ))}
        </div>

        {/* Error */}
        {error && <p className="text-red-400 text-sm text-center mb-3">{error}</p>}

        {/* Resend */}
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

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={prevStep}
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

export default VerifyEmail;