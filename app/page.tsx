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

const API_URL = "http://localhost:8080/tasks";
const CART_API_URL = "http://localhost:8080/cart";

interface TaskType {
  id: number;
  completed: boolean;
  title: string;
  author: string;
  subheading?: string;
  price: number;
}

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
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
      fetchTasks(storedToken);
    }
  }, []);

  const fetchTasks = async (token: string) => {
    try {
      console.log("Fetching tasks...");
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched tasks:", data);
        setTasks(data);
      } else {
        console.error("Failed to fetch books, Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
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

  

  const handleAddToCart = async (task: TaskType, quantity = 1) => {
    console.log("handleAddToCart triggered");
    if (!token) return alert("You must be logged in to add to cart");

    try {
      const payload = { bookId: task.id, quantity };
      console.log("Sending payload:", payload);
      console.log("Sending request with token:", token);

      const response = await fetch(`${CART_API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add to cart: ${response.status} - ${errorText}`);
      }
      alert("✅ Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  

 

  return (
    <SidebarProvider className="shadow-xl">
    <div className="flex flex-row flex-1 ">
      <AppSidebar />
      <div className="flex flex-col flex-1 justify-center items-center py-5">
        <h1 className="text-xl font-bold">Bookstore</h1>

        
        <CreateBookForm token={token}/>
        <Button onClick={handleLogout} className="mt-4 bg-red-600 text-white w-32">Logout</Button>

        <div className="flex flex-col space-y-4 mt-4">
          {tasks.map((task) => (
            <Card key={task.id} task={task}
              onAddToCart={()=>{
                handleAddToCart(task);
              }}
            />
          ))}
        </div>
      </div>
    </div>
    </SidebarProvider>
  );
}
