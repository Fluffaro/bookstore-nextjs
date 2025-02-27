"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // ✅ Import Image


export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in by looking for a token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false);
    alert("Logged out successfully");
    router.push("/login"); // Redirect to login
  };

  return (
    <nav className="flex flex-col sticky
     justify-between items-center p-4 border-b shadow-md">
      {/* 🏠 Bookstore Logo */}
      <Link href="/">
      <div className="flex flex-row justify-center items-center"><Image src="/starimagepng.png" alt="App Icon" width={32} height={32}/>
      <h1 className="text-lg font-semibold cursor-pointer"> Bookstore</h1></div>
      
      </Link>

      {/* Navbar Buttons */}
      <div className="flex gap-4">
        {isLoggedIn ? (
          <>
            {/* 🛒 View Cart Button */}
            <Link href="/cart">
              <Button variant="outline" className="flex items-center gap-2">
                <ShoppingCart size={18} /> View Cart
              </Button>
            </Link>

            {/* 🚪 Logout Button */}
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
