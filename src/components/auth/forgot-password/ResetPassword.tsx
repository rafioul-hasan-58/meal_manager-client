"use client";
import { Lock, ArrowRight } from "lucide-react";
import Image from "next/image";
import logo from "@/src/assets/logo.png";
import FormInput from "@/src/components/lib/FormInput";
import { useState } from "react";
import { useNewPasswordMutation } from "@/src/redux/features/auth/authApi";
import toast from "react-hot-toast";

interface ResetPasswordProps {
  email: string;
  onSuccess: () => void;
}

const ResetPassword = ({ email, onSuccess }: ResetPasswordProps) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const [newPassword, { isLoading }] = useNewPasswordMutation();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await newPassword({
        email,
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
    <div className="bg-white lg:rounded-xl lg:shadow-xl w-full max-w-md lg:mx-4 overflow-hidden">
      {/* Top banner */}
      <div className="bg-linear-to-r from-blue-500 to-blue-700 px-8 py-10 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Image className="rounded-sm" src={logo} alt="logo" width={80} height={80} />
        </div>
        <h1 className="text-2xl font-bold text-white">Reset Password</h1>
        <p className="text-blue-100 text-sm mt-1">Set your new password below</p>
      </div>

      {/* Body */}
      <div className="px-8 py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-3">
            <Lock className="w-7 h-7 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Create new password</h2>
          <p className="text-gray-500 text-sm">Your new password must be at least 6 characters.</p>
        </div>

        <div className="flex flex-col gap-4">
          <FormInput
            name="password"
            label="New Password"
            type="password"
            icon={Lock}
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            showPasswordToggle
            error={errors.password}
          />
          <FormInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
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
          className="w-full mt-6 bg-linear-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-70"
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <>Reset Password <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;