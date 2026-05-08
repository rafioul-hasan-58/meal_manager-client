import { IRegister } from "@/src/types/registerType";
import { User, Mail, Lock, Phone, Camera, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef } from "react";
import StepIndicator from "./StepIndicator";
import FormInput from "../../lib/FormInput";

interface Props {
    formData: IRegister;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handlePhotoUpload: (e: ChangeEvent<HTMLInputElement>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const CreateAccount = ({ formData, handleChange, handlePhotoUpload, nextStep, prevStep }: Props) => {
    const fileRef = useRef<HTMLInputElement>(null);

    const isValid =
        formData.fullName &&
        formData.email &&
        formData.password &&
        formData.password === formData.confirmPassword &&
        formData.phone;

    return (
        <div className="bg-white lg:rounded-2xl lg:shadow-xl w-full max-w-md lg:mx-4 overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-blue-500 to-blue-700 px-8 pt-6 pb-4">
                <StepIndicator currentStep={2} />
                <h2 className="text-white text-lg font-semibold text-center">Create Your Account</h2>
                <p className="text-blue-100 text-xs text-center mt-0.5">Fill in your personal details</p>
            </div>

            <div className="px-8 py-6 space-y-4">
                {/* Photo Upload */}
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="relative w-20 h-20 rounded-full border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50 flex items-center justify-center overflow-hidden transition-colors group"
                    >
                        {formData.photoPreview ? (
                            <Image src={formData.photoPreview} alt="Preview" fill className="object-cover" />
                        ) : (
                            <div className="flex flex-col items-center gap-1">
                                <Camera className="w-5 h-5 text-blue-400 group-hover:text-blue-600" />
                                <span className="text-[9px] text-blue-400 group-hover:text-blue-600">Photo</span>
                            </div>
                        )}
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </div>
                {[
                    { name: "fullName", label: "Full Name", type: "text", icon: User, placeholder: "John Doe", showPasswordToggle: false },
                    { name: "email", label: "Email", type: "email", icon: Mail, placeholder: "john@example.com", showPasswordToggle: false },
                    { name: "phone", label: "Phone", type: "tel", icon: Phone, placeholder: "+880 1700 000000", showPasswordToggle: false },
                    { name: "password", label: "Password", type: "password", icon: Lock, placeholder: "Min. 8 characters", showPasswordToggle: true },
                    { name: "confirmPassword", label: "Confirm Password", type: "password", icon: Lock, placeholder: "Repeat password", showPasswordToggle: true },
                ].map(({ name, label, type, icon, placeholder, showPasswordToggle }) => (
                    <FormInput
                        key={name}
                        name={name}
                        label={label}
                        type={type}
                        icon={icon}
                        placeholder={placeholder}
                        value={formData[name as keyof IRegister] as string}
                        onChange={handleChange}
                        showPasswordToggle={showPasswordToggle}
                        error={
                            name === "confirmPassword" && formData.confirmPassword && formData.password !== formData.confirmPassword
                                ? "Passwords do not match"
                                : undefined
                        }
                    />
                ))}

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                    <button
                        onClick={prevStep}
                        className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                        onClick={nextStep}
                        disabled={!isValid}
                        className="flex-1 bg-linear-to-r from-blue-500 to-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-40"
                    >
                        Next <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;