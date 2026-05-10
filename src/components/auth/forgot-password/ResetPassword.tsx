"use client";
import { Lock, ArrowRight } from "lucide-react";
import Image from "next/image";
import logo from "@/src/assets/logo.png";
import FormInput from "@/src/components/lib/FormInput";
import { useState } from "react";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "@/src/redux/features/auth/authApi";
import { jwtDecode } from "jwt-decode";

interface ResetPasswordProps {
  onSuccess: () => void;
  token: string;
}

const ResetPassword = ({ onSuccess, token }: ResetPasswordProps) => {
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = { password: "", confirmPassword: "" };
    let valid = true;
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  // Password strength helper
  const getStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^a-zA-Z0-9]/.test(pw)) score++;
    return score;
  };

  const strengthScore = getStrength(formData.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strengthScore] ?? "";
  const strengthColor = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-500"][strengthScore] ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const decoded = jwtDecode<{ email: string }>(token);
      const email = decoded.email;
      const response = await resetPassword({
        email,
        confirmPassword: formData.confirmPassword,
        newPassword: formData.password,
      }).unwrap();
      if (response.success) {
        toast.success("Password reset successfully!");
        onSuccess();
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.data?.errorMessages?.[0]?.message ||
        "Failed to reset password. Please try again.";
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
        <h1 className="text-2xl font-bold text-white">Reset Password</h1>
        <p className="text-blue-200 text-sm mt-1">Set your new password below</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 pt-5 px-8">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-medium">✓</div>
          <span className="text-green-400 text-xs font-medium">Email</span>
        </div>
        <div className="flex-1 h-px bg-green-700 mx-1" />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-medium">✓</div>
          <span className="text-green-400 text-xs font-medium">Verify OTP</span>
        </div>
        <div className="flex-1 h-px bg-blue-700 mx-1" />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-medium">3</div>
          <span className="text-blue-400 text-xs font-medium">Reset</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 py-7">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-900/50 border border-blue-800 mb-3">
            <Lock className="w-7 h-7 text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-100 mb-1">Create new password</h2>
          <p className="text-slate-400 text-sm">Your new password must be at least 6 characters.</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <FormInput
              name="password"
              label="New Password"
              type="password"
              className="text-white"
              icon={Lock}
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              showPasswordToggle
              error={errors.password}
            />
            {/* Strength bar */}
            {formData.password.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 h-1 rounded-full transition-colors ${
                        i <= strengthScore ? strengthColor : "bg-[#334155]"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  Strength:{" "}
                  <span className={`font-medium ${
                    strengthScore <= 1 ? "text-red-400"
                    : strengthScore === 2 ? "text-orange-400"
                    : strengthScore === 3 ? "text-yellow-400"
                    : "text-green-400"
                  }`}>
                    {strengthLabel}
                  </span>
                </p>
              </div>
            )}
          </div>

          <FormInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            className="text-white"
            icon={Lock}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            showPasswordToggle
            error={errors.confirmPassword}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Reset Password <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;