"use client";
import { useState, useRef } from "react";
import StepIndicator from "./StepIndicator";
import { useVerifyEmailMutation, useVerifyOtpMutation } from "@/src/redux/features/auth/authApi";
import { Loader } from "lucide-react";
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
  const [isShaking, setIsShaking] = useState(false); // ✅ shake state
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useVerifyEmailMutation();

  // ✅ Trigger shake + clear OTP on failure
  const triggerError = (message: string) => {
    setError(message);
    setIsShaking(true);

    setTimeout(() => {
      setOtp(Array(OTP_LENGTH).fill(""));
      setIsShaking(false);
      inputRefs.current[0]?.focus();
    }, 500); // shake duration
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
      triggerError(errorMessage); // ✅ shake + clear on API error
    }
  };

  const handleResend = async () => {
    setResendMsg("");
    try {
      const response = await resendOtp({ email }).unwrap();
      if (response.success) {
        setResendMsg("A new code has been sent!");
        setOtp(Array(OTP_LENGTH).fill(""));
        setError("")
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
    <div className="bg-white lg:rounded-2xl shadow-lg p-8 w-full max-w-md lg:mx-4">
      {/* Shake keyframe injected via style tag */}
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
        .shake {
          animation: shake 0.6s ease;
        }
      `}</style>

      {/* Header */}
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

      {/* OTP Inputs */}
      {/* ✅ shake class applied to wrapper, red border on each input when error */}
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
            className={`w-11 h-12 text-center text-lg font-semibold border-2 rounded-lg outline-none transition-colors
              ${error
                ? "border-red-500 bg-red-50 text-red-600"           // ✅ error state
                : digit
                  ? "border-blue-500 bg-blue-50 text-blue-600"      // filled state
                  : "border-gray-200 text-blue-600"                  // empty state
              }
              focus:border-blue-500`}
          />
        ))}
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

      {/* Resend */}
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

      {/* Actions */}
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
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Verifying...
            </>
          ) : (
            <>Verify & Continue</>
          )}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;