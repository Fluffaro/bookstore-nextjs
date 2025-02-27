"use client";

import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    
    <div className="bg-[#e9e9e9]">
      <div className="flex h-screen w-full">
        {/* Left Side - Image */}
        <div
          className="w-2/3 bg-cover bg-center"
          style={{ backgroundImage: "url('/login-image.jpg')" }}
        ></div>

        {/* Right Side - Login Form */}
        <LoginForm />
      </div>
    </div>
  );
}
