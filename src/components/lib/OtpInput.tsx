"use client";
import { useRef } from "react";

const OTP_LENGTH = 6;

interface OtpInputProps {
    otp: string[];
    setOtp: (otp: string[]) => void;
    error?: string;
    isShaking?: boolean;
}

const OtpInput = ({ otp, setOtp, error, isShaking }: OtpInputProps) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const updated = [...otp];
        updated[index] = value.slice(-1);
        setOtp(updated);
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

    return (
        <>
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
                                ? "border-red-500 bg-red-50 text-red-600"
                                : digit
                                    ? "border-blue-500 bg-blue-50 text-blue-600"
                                    : "border-gray-200 text-blue-600"
                            }
              focus:border-blue-500`}
                    />
                ))}
            </div>

            {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
        </>
    );
};

export { OTP_LENGTH };
export default OtpInput;