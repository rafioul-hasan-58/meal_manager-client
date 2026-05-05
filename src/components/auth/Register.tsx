"use client";
import { IRegister } from "@/src/types/register";
import { useState } from "react"

const Register = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const [formData, setFormData] = useState<IRegister>({
    // User
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    photoFile: null,
    photoPreview: null,

    // Mess
    messName: "",
    messAddress: "",
    messDescription: "",
    approxTotalMembers: 1,
  });
  return (
    <div>
      <h1>This is register page</h1>
    </div>
  )
}

export default Register
