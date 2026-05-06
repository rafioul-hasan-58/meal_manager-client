import { LucideIcon, Eye, EyeOff } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface FormInputProps {
    name: string;
    label: string;
    type: string;
    icon: LucideIcon;
    placeholder: string;
    className?: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showPasswordToggle?: boolean; // 👈 opt-in only
    error?: string;
}

const FormInput = ({
    name,
    label,
    type,
    icon: Icon,
    placeholder,
    className,
    value,
    onChange,
    showPasswordToggle = false,
    error,
}: FormInputProps) => {
    const [visible, setVisible] = useState(false);

    const resolvedType = showPasswordToggle
        ? visible ? "text" : "password"
        : type;

    return (
        <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">{label}</label>
            <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    name={name}
                    type={resolvedType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-full pl-9 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition text-black ${className}`}
                />
                {/* Eye icon only if showPasswordToggle is passed */}
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setVisible((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                        {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                )}
            </div>
            {error && <p className="text-red-500 text-[10px] mt-1">{error}</p>}
        </div>
    );
};

export default FormInput;