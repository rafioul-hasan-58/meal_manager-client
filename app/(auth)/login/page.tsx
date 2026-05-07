// app/login/page.tsx (or wherever LoginScreen is rendered)

import Login from "@/src/components/auth/Login";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#EEF2F7] flex lg:items-center justify-center lg:px-4">
      <Login />
    </div>
  );
};

export default LoginPage;