interface Props {
    currentStep: number; // 2, 3, or 4
}

const steps = [
    { label: "Account" },
    { label: "Mess Info" },
    { label: "Verify" },
    { label: "Review" },
];

const StepIndicator = ({ currentStep }: Props) => {
    // currentStep from parent is 2,3,4 → normalize to 1,2,3
    const normalized = currentStep - 1;

    return (
        <div className="flex items-center justify-center gap-0 mb-6">
            {steps.map((s, i) => {
                const stepNum = i + 1;
                const isCompleted = normalized > stepNum;
                const isActive = normalized === stepNum;

                return (
                    <div key={i} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all
                  ${isCompleted ? "bg-blue-600 text-white ring-4 " :
                                        isActive ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                                            "bg-gray-100 text-gray-400"}`}
                            >
                                {isCompleted ? "✓" : stepNum}
                            </div>
                            <span className={`text-[10px] mt-1 font-medium ${isActive ? "text-blue-600" : "text-gray-400"}`}>
                                {s.label}
                            </span>
                        </div>
                        {i < steps.length - 1 && (
                            <div className={`w-16 h-0.5 mb-4 mx-1 ${normalized > stepNum ? "bg-blue-600" : "bg-gray-200"}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default StepIndicator;