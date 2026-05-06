"use client";
import { IRegister } from "@/src/types/register";
import { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import CreateAccount from "./CreateAccount";
import MessDetails from "./MessDetails";
import ReviewProfile from "./ReviewProfile";
import VerifyEmail from "./VerifyEmail"; // 👈 new import


const Register = () => {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const [formData, setFormData] = useState<IRegister>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    photoFile: null,
    photoPreview: null,
    messName: "",
    messAddress: "",
    messDescription: "",
    approxTotalMembers: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const name = target.name;
    let value: string | boolean | number = target.value;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      value = target.checked;
    }
    if (target instanceof HTMLInputElement && target.type === "number") {
      value = Number(target.value);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, photoFile: file, photoPreview: photoURL }));
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting:", formData);
    // TODO: wire up your registerMutation here
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WelcomeScreen nextStep={nextStep} />;
      case 2:
        return (
          <CreateAccount
            formData={formData}
            handleChange={handleChange}
            handlePhotoUpload={handlePhotoUpload}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <MessDetails
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:                       
        return (
          <VerifyEmail
            email={formData.email}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:                       
        return (
          <ReviewProfile
            formData={formData}
            onSubmit={handleSubmit}
            prevStep={prevStep}
            isLoading={false}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100">
      {renderStep()}
    </div>
  );
};

export default Register;