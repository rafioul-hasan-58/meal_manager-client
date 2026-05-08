"use client";
import { IRegister } from "@/src/types/registerType";
import { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import CreateAccount from "./CreateAccount";
import MessDetails from "./MessDetails";
import ReviewProfile from "./ReviewProfile";
import VerifyEmail from "./VerifyEmail"; // 👈 new import
import { useRegisterMutation } from "@/src/redux/features/user/userApi";
import toast from "react-hot-toast";
import { decodeToken } from "@/src/utils/jwtdecoder";
import { useAppDispatch } from "@/src/redux/hooks";
import { setCredentials } from "@/src/redux/features/auth/authSlice";


const Register = () => {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();
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
    try {
      const response = await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        messName: formData.messName,
        messAddress: formData.messAddress,
        messDescription: formData.messDescription,
        approxTotalMembers: formData.approxTotalMembers,
      }).unwrap();

      if (response.success) {
        toast.success("User registered successfully!");
        dispatch(setCredentials({ access_token: response.data.accessToken }));
        const decodedToken = decodeToken(response.data.accessToken);
        window.location.href = `/dashboard/${decodedToken.globalRole === "admin" ? "admin" : "user"}`;
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.data?.errorMessages?.[0]?.message ||
        "Registration failed. Please try again.";
      console.log("Registration Error:", err);
      toast.error(errorMessage);
    }
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
            isLoading={isLoading} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="lg:min-h-screen lg:flex lg:items-center justify-center bg-linear-to-br from-blue-50 to-blue-100">
      {renderStep()}
    </div>
  );
};

export default Register;