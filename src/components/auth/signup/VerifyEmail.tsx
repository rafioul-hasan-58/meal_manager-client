"use client";
import { useState, useRef } from "react";
import StepIndicator from "./StepIndicator";

interface VerifyEmailProps {
  email: string;
  nextStep: () => void;
  prevStep: () => void;
}

const OTP_LENGTH = 6;

const VerifyEmail = ({ email, nextStep, prevStep }: VerifyEmailProps) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isResending, setIsResending] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // digits only
    const updated = [...otp];
    updated[index] = value.slice(-1); // keep last digit
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

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      setError("Please enter the complete 6-digit code.");
      return;
    }
    // TODO: call your verify-email API with `code` here
    console.log("Verifying OTP:", code);
    nextStep();
  };

  const handleResend = async () => {
    setIsResending(true);
    setResendMsg("");
    // TODO: call your resend-otp API here
    await new Promise((r) => setTimeout(r, 1000)); // simulate request
    setIsResending(false);
    setResendMsg("A new code has been sent!");
    setOtp(Array(OTP_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-4">
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
      <div className="flex justify-center gap-3 mb-4" onPaste={handlePaste}>
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
              ${digit ? "border-blue-500 bg-blue-50" : "border-gray-200"}
              ${error ? "border-red-400" : ""}
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
              className="text-blue-600 text-sm hover:underline disabled:opacity-50"
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
          className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Verify & Continue
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;