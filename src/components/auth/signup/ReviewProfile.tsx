import { IRegister } from "@/src/types/registerType";
import { User, Mail, Phone, Building2, MapPin, Users, ArrowLeft, CheckCircle } from "lucide-react";
import Image from "next/image";
import StepIndicator from "./StepIndicator";

interface Props {
    formData: IRegister;
    onSubmit: () => void;
    prevStep: () => void;
    isLoading: boolean;
}

const ReviewProfile = ({ formData, onSubmit, prevStep, isLoading }: Props) => {
    const userFields = [
        { icon: User, label: "Full Name", value: formData.fullName },
        { icon: Mail, label: "Email", value: formData.email },
        { icon: Phone, label: "Phone", value: formData.phone },
    ];

    const messFields = [
        { icon: Building2, label: "Mess Name", value: formData.messName },
        { icon: MapPin, label: "Address", value: formData.messAddress },
        { icon: Users, label: "Members", value: String(formData.approxTotalMembers) },
    ];

    return (
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl shadow-2xl w-full max-w-md lg:mx-4 overflow-hidden">
            {/* Header */}
            <div className="bg-blue-700 px-8 pt-6 pb-4">
                <StepIndicator currentStep={5} />
                <h2 className="text-slate-100 text-lg font-semibold text-center">Review & Submit</h2>
                <p className="text-blue-200 text-xs text-center mt-0.5">Double-check your info before submitting</p>
            </div>

            <div className="px-8 py-6 space-y-5">
                {/* Avatar */}
                {formData.photoPreview && (
                    <div className="flex justify-center">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-blue-800">
                            <Image src={formData.photoPreview} alt="Profile" fill className="object-cover" />
                        </div>
                    </div>
                )}

                {/* Personal Info */}
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Personal Info</p>
                    <div className="bg-[#0f172a] rounded-xl divide-y divide-[#334155]">
                        {userFields.map(({ icon: Icon, label, value }) => (
                            <div key={label} className="flex items-center gap-3 px-4 py-2.5">
                                <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                                <span className="text-xs text-slate-500 w-20 shrink-0">{label}</span>
                                <span className="text-sm text-slate-100 font-medium truncate">{value || "—"}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mess Info */}
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Mess Info</p>
                    <div className="bg-[#0f172a] rounded-xl divide-y divide-[#334155]">
                        {messFields.map(({ icon: Icon, label, value }) => (
                            <div key={label} className="flex items-center gap-3 px-4 py-2.5">
                                <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                                <span className="text-xs text-slate-500 w-20 shrink-0">{label}</span>
                                <span className="text-sm text-slate-100 font-medium truncate">{value || "—"}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {formData.messDescription && (
                    <div className="bg-blue-900/50 border border-blue-800 rounded-xl px-4 py-3">
                        <p className="text-xs text-slate-500 mb-1">Description</p>
                        <p className="text-sm text-slate-400">{formData.messDescription}</p>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-1">
                    <button
                        onClick={prevStep}
                        className="flex-1 border border-[#334155] text-slate-400 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#0f172a] hover:text-slate-200 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={isLoading}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        ) : (
                            <><CheckCircle className="w-4 h-4" /> Submit</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewProfile;