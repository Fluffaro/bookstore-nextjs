"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorEffect, setShowErrorEffect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    // Check if token exists in localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    
    if (token) {
      router.push("/"); // Redirect to home page if already logged in
    }
  }, []);


  const handleRegister = async () => {
    if (!isClient) return;

    setErrorMessage(""); // Reset previous errors
    setIsLoading(true);

    // Validation checks
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("All fields are required!");
      triggerErrorEffect();
      return;
    }

    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email.");
      triggerErrorEffect();
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      triggerErrorEffect();
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      const minLoadingTime = 1000;
      const startTime = Date.now();

      if (response.ok) {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        await delay(remainingTime);

        router.push("/login");
      } else {
        setErrorMessage("Registration failed. Try a different username or email.");
        triggerErrorEffect();
      }
    } catch (error) {
      setErrorMessage("Error connecting to the server.");
      triggerErrorEffect();
    }
  };

  const triggerErrorEffect = async () => {
    setShowErrorEffect(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Show red effect for 1 second
    setShowErrorEffect(false);
    setIsLoading(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-1/3 flex min-h-[450px] flex-col shadow-lg pt-16 pb-8 items-center rounded-xl bg-white mr-2 mt-2 mb-2">
      <Image src="/starimage.jpg" alt="App Icon" width={48} height={48} className="mb-2" />

      <h1 className="text-2xl pt-3 font-bold text-[#000000]">Create Account</h1>
      <p className="text-[#00000080] mb-6 pt-2 text-xs">Join us today!</p>

      <div className="relative z-0 w-64">
        <input
          type="text"
          placeholder=" "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        <label 
        className="absolute text-xs text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600">
          Username
        </label>
      </div>

      <div className="relative z-0 mt-3 w-64">
        <input
          type="email"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        <label 
        className="absolute text-xs text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600">
          Email
        </label>
      </div>

      <div className="relative z-0 mt-3 w-64">
        <input
          type="password"
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        <label 
        className="absolute text-xs text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600">
          Password
        </label>
      </div>

      <div className="relative z-0 mt-3 w-64">
        <input
          type="password"
          placeholder=" "
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        <label 
        className="absolute text-xs text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600">
          Confirm Password
        </label>
      </div>

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 mt-2 text-xs">{errorMessage}</p>}

      {/* Register Button with Shake and Temporary Red Effect */}
      <motion.div
        animate={showErrorEffect ? { x: [-8, 8, -8, 8, 0] } : {}}
        transition={{ duration: 0.3 }}
        className="w-64"
      >
        <Button
          onClick={handleRegister}
          disabled={isLoading}
          className={`w-full rounded-3xl mt-7 px-4 py-2 transition-all duration-200 ease-in-out 
            flex items-center justify-center
            ${showErrorEffect ? "bg-red-600" : "bg-[#121212]"} 
            text-white active:scale-95`}
        >
          {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Sign Up"}
        </Button>
      </motion.div>

      <p className="text-[#00000080] relative z-0 mt-6 text-xs text-center">
        Already have an account?{" "}
        <button
          className="text-blue-600 font-semibold hover:underline transition-all duration-200"
          onClick={() => router.push("/login")}
        >
          Log in
        </button>
      </p>
    </div>
  );
}
