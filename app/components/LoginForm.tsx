"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"



export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorEffect, setShowErrorEffect] = useState(false);
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


  const handleLogin = async () => {
    if (!isClient) return;
  
    setIsLoading(true);
  
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      const minLoadingTime = 1000; // 1 second
  
      const startTime = Date.now(); // Track when request started
  
      if (response.ok) {
        const data = await response.json();
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
  
        await delay(remainingTime); // Ensure at least 1 second
  
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
        }
        router.push("/");
      } else {
        setShowErrorEffect(true); // Activate red error effect
  
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
  
        await delay(remainingTime); // Ensure at least 1 second of loading
        setIsLoading(false);
        setShowErrorEffect(false);


      }
    } catch (error) {

  
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Keep the red effect for 1 second
      setIsLoading(false);
      setShowErrorEffect(false);
    }
  };
  

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-1/3 min-h-[450px] flex flex-col shadow-lg pt-16 pb-8 items-center rounded-xl bg-white mr-2 mt-2 mb-2">
      {/* Image at the Top */}

      
      <Image src="/starimage.jpg" alt="App Icon" width={48} height={48} className="mb-2" />

      <h1 className="text-2xl pt-3 font-bold text-[#000000]">Welcome Back</h1>
      <p className="text-[#00000080] mb-6 pt-2 text-xs">Please enter your details</p>

      <div className="relative z-0 w-64">
        <input
          type="text"
          id="username"
          placeholder=" "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        <label
          htmlFor="username"
          className="absolute text-xs text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600"
        >
          Username
        </label>
      </div>

      <div className="relative z-0 mt-3 w-64">
        <input
          type="password"
          id="password"
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        <label
          htmlFor="password"
          className="absolute text-xs text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600"
        >
          Password
        </label>
      </div>
   {/* Invisible Inputs to Match RegisterForm */}
   <div className="relative z-0 w-64 opacity-0 pointer-events-none">
    <input type="text" className="block py-3 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300" />
  </div>

  <div className="relative z-0 w-64 opacity-0 pointer-events-none">
    <input type="password" className="block py-5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300" />
  </div>

      {/* Login Button with Shake and Temporary Red Effect */}
      <motion.div
        animate={showErrorEffect ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-64"
      >
        <Button
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-full rounded-3xl mt-7 px-4 py-2 transition-all duration-200 ease-in-out 
            flex items-center justify-center
            ${showErrorEffect ? "bg-red-600" : "bg-[#121212]"} 
            text-white active:scale-95`}
        >
          {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Login"}
        </Button>
      </motion.div>
        
      <p className="text-[#00000080] relative z-0 mt-6 text-xs text-center">
        Don't have an account?{" "}
        <button className="text-blue-600 font-semibold hover:underline transition-all duration-200"
         onClick={() => router.push("/register")}>
          Sign up
        </button>
      </p>
    </div>
  );
}
