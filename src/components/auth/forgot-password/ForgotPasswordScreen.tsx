"use client";
import ForgotPasswordEmail from "@/src/components/auth/forgot-password/ForgotPasswordEmail";
import ForgotPasswordOtp from "@/src/components/auth/forgot-password/ForgotPasswordOtp";
import ResetPassword from "@/src/components/auth/forgot-password/ResetPassword";
import { useState } from "react";

type Step = "email" | "otp" | "reset";

const ForgotPasswordScreen = () => {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const handleEmailNext = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep("otp");
  };

  const handleOtpNext = () => {
    setStep("reset");
  };

  const handleOtpBack = () => {
    setStep("email");
  };

  const handleResetSuccess = () => {
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      {step === "email" && (
        <ForgotPasswordEmail onNext={handleEmailNext} />
      )}
      {step === "otp" && (
        <ForgotPasswordOtp
          email={email}
          onNext={handleOtpNext}
          onBack={handleOtpBack}
          setToken={setToken}
        />
      )}
      {step === "reset" && (
        <ResetPassword
          token={token}
          onSuccess={handleResetSuccess}
        />
      )}
    </div>
  );
};

export default ForgotPasswordScreen;