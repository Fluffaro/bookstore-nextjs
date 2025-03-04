"use client";

import { useEffect, useState } from "react";
import Card from "./components/BookCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import CreateBookForm from "./components/CreateBookForm";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { CART_API_URL, API_URL } from "@/constants";
import Navbar from "@/components/Navbar";
import FeaturedBook from "@/components/FeaturedBook";
import CategoryFilter from "@/components/CategoryFilter";

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
  const [allBooks, setAllBooks] = useState<BookType[]>([]); // Store all books
  const [books, setBooks] = useState<BookType[]>([]); // Displayed books
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const [featuredBook, setFeaturedBook] = useState<BookType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
        setAllBooks(data); // Store all books permanently
        setBooks(data); // Default to showing all books

        // ✅ Only set featured book once (don't reset when filtering)
        if (!featuredBook) {
          const featured = data.find((book: BookType) => book.title === "The Great Gatsby");
          setFeaturedBook(featured || null);
        }
      } else {
        console.error("Failed to fetch books, Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // ✅ Only filter books for display, without modifying the full list
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    
    if (category) {
      setBooks(allBooks.filter(book => book.category === category));
    } else {
      setBooks(allBooks);
    }
  };

  if (token === null) {
    return <p>Loading...</p>; // Prevent rendering until token is set
  }

  return (
    <SidebarProvider className="shadow-xl">
      <div className="flex flex-row flex-1">
        <AppSidebar />

        <div className="flex flex-col flex-1">
          {/* ✅ Always show the Featured Book */}
          {featuredBook && (
            <div className="w-full px-10 pb-10 mt-12">
              <FeaturedBook book={featuredBook} token={token} />
            </div>
          )}

          {/* ✅ Scrollable Filter Tab */}
          <div className="flex w-full justify-center">
            <div className="overflow-y-auto px-1 max-w-[78vh] items-center">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onChange={handleCategoryChange}
              />
            </div>
          </div>

          {/* ✅ Book Grid - Ensure It Doesn't Overlap */}
          <div className="grid grid-cols-3 gap-5 ml-20 mr-20 justify-items-center">
            {books.map((book) => (
              <Card key={book.id} book={book} token={token} />
            ))}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
