"use client";
import { useEffect, useState } from "react";
import Card from "./components/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import CreateBookForm from "./components/CreateBookForm";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { CART_API_URL } from "@/constants";
import { API_URL } from "@/constants";

interface BookType {
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  coverImage: string;
  category: string;
  featured: boolean;
}

export default function Home() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.warn("No token found. Redirecting to login.");
      router.push("/login");
    } else {
      console.log("Token found:", storedToken);
      setToken(storedToken);
      fetchBooks(storedToken);
    }
  }, []);

  const fetchBooks = async (token: string) => {
    try {
      console.log("Fetching books...");
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched books:", data);
        setBooks(data);
      } else {
        console.error("Failed to fetch books, Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  if (token === null) {
    return <p>Loading...</p>; // Prevent rendering CreateBookForm until token is set
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };
  return (
    <SidebarProvider className="shadow-xl">
      <div className="flex flex-row flex-1 ">
        <AppSidebar />
        <div className="flex flex-col flex-1 justify-center items-center py-5">
          <h1 className="text-xl font-bold">Bookstore</h1>
          <CreateBookForm token={token} />
          <Button onClick={handleLogout} className="mt-4 bg-red-600 text-white w-32">Logout</Button>
          <div className="flex flex-col space-y-4 mt-4">
            {books.map((book) => (
              <Card
                key={book.id}
                book={book}

                token={token}
              />
            ))}
          </div>

        </div>
      </div>
    </SidebarProvider>
  );
}
