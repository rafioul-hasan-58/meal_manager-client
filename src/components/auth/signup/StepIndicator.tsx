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
    const normalized = currentStep - 1;
    const isFinalStep = currentStep === 5; // step 4 normalized = 5

    return (
        <div className="flex items-start justify-center w-full mb-6">
            {steps.map((s, i) => {
                const stepNum = i + 1;
                const isCompleted = normalized > stepNum;
                const isActive = normalized === stepNum;

                return (
                    <div key={i} className="flex items-start">
                        {/* Circle + label */}
                        <div className="flex flex-col items-center w-12 shrink-0">
                            <div
                                className={`ring-4 ring-blue-600 w-7 h-7 lg:w-8 lg:h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all shrink-0
                                    ${isCompleted || isActive
                                        ? "bg-white text-blue-700"
                                        : "bg-white/20 text-white/50"
                                    }
                                    ${isActive ? "ring-4 ring-blue-600 " : ""}
                                `}
                            >
                                {isCompleted ? "✓" : stepNum}
                            </div>
                            <span
                                className={`text-[10px] mt-1 font-medium text-center leading-tight w-full
                                    ${isCompleted || isActive ? "text-white" : "text-white/45"}
                                `}
                            >
                                {s.label}
                            </span>
                        </div>
                        {/* Connector */}
                        {i < steps.length - 1 && (
                            <div
                                className={`h-0.5 mt-3.5 flex-1 min-w-2 max-w-10
            ${isFinalStep
                                        ? normalized > stepNum ? "bg-blue-400/70" : "bg-blue-200"
                                        : normalized > stepNum ? "bg-blue-600" : "bg-blue-200"
                                    }
        `}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default StepIndicator;