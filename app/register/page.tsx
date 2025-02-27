"use client";

import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    
    <div className="bg-[#e9e9e9]">
      <div className="flex h-screen w-full">
        {/* Left Side - Image */}
        <div
          className="w-2/3 bg-cover bg-center"
          style={{ backgroundImage: "url('/login-image.jpg')" }}
        ></div>

        {/* Right Side - Login Form */}
        <RegisterForm />
      </div>
    </div>
  );
}
