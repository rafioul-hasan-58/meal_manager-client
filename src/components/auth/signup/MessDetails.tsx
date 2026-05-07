"use client";

import { IRegister } from "@/src/types/register";
import { Building2, MapPin, FileText, Users, ArrowRight, ArrowLeft, Loader } from "lucide-react";
import { ChangeEvent } from "react";
import StepIndicator from "./StepIndicator";
import FormInput from "../../lib/FormInput";
import { useVerifyEmailMutation } from "@/src/redux/features/auth/authApi";
import toast from "react-hot-toast";

interface Props {
    formData: IRegister;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const MessDetails = ({ formData, handleChange, nextStep, prevStep }: Props) => {
    const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
    const isValid = formData.messName && formData.messAddress && formData.approxTotalMembers >= 1;
    const handleVerifyEmail = async () => {
        try {
            const res = await verifyEmail({ email: formData.email }).unwrap();
            if (res.success) {
                toast.success("OTP sent to your email! Please check and verify.")
            } else {
                toast.error("Failed to send OTP. Please try again.")
            }
            nextStep()

        } catch (err) {
            console.error("Email verification failed:", err);
        }
    };
    return (
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-blue-500 to-blue-700 px-8 pt-6 pb-4">
                <StepIndicator currentStep={3} />
                <h2 className="text-white text-lg font-semibold text-center">Mess Information</h2>
                <p className="text-blue-100 text-xs text-center mt-0.5">Tell us about your mess</p>
            </div>

            <div className="px-8 py-6 space-y-4">

                {
                    [
                        { name: "messName", label: "Mess Name", type: "text", icon: Building2, placeholder: "e.g. Green Valley Mess", showPasswordToggle: false },
                        { name: "messAddress", label: "Mess Address", type: "text", icon: MapPin, placeholder: "e.g. House 12, Road 5, Mirpur, Dhaka", showPasswordToggle: false },
                        { name: "approxTotalMembers", label: "Approx. Total Members", type: "number", icon: Users, placeholder: "e.g. 10", showPasswordToggle: false }
                    ].map(({ name, label, type, icon, placeholder }) => (
                        <FormInput
                            key={name}
                            name={name}
                            label={label}
                            type={type}
                            icon={icon}
                            placeholder={placeholder}
                            value={formData[name as keyof IRegister] as string}
                            onChange={handleChange}
                        />
                    ))}

                {/* Description */}
                <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                        Description <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <textarea
                            name="messDescription"
                            placeholder="Short description about your mess..."
                            value={formData.messDescription}
                            onChange={handleChange}
                            rows={3}
                            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition resize-none text-black"
                        />
                    </div>
                </div>

                {/* Info box */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-2">
                    <Building2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-600 leading-relaxed">
                        You will become the <strong>admin</strong> of this mess. You can invite members after setup.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                    <button
                        onClick={prevStep}
                        className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                        onClick={handleVerifyEmail}
                        disabled={!isValid}
                        className="flex-1 bg-linear-to-r from-blue-500 to-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-40"
                    >
                        Next {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessDetails;