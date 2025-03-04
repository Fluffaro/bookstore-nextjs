"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { CART_API_URL } from "@/constants";

interface BookType {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage?: string;
  category?: string;
  featured?: boolean;
}

interface BookCardProps {
  book: BookType;
  token: string;
  className?: string;
}

const BookCard = ({ book, token, className = "" }: BookCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = async (book: BookType, quantity = 1) => {
    if (!token) return alert("You must be logged in to add to cart");

    try {
      const payload = { bookId: book.id, quantity };
      const response = await fetch(`${CART_API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to add to cart: ${response.status}`);
      }
      toast(
        `${book.title} has been added to your cart.`,
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div 
      className={`book-card max-w-[200px] rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/book/${book.id}`} className="block h-full">
        <div className="relative aspect-[2/3] overflow-hidden">
          {book.coverImage && (
            <img
              src={book.coverImage}
              alt={book.title}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
          )}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : ""}`}>
            <div className="absolute bottom-4 left-4 right-4">
              <Button 
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(book);
                }}
                className="w-full bg-white/90 hover:bg-white text-book-dark transition-all duration-300"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white">
          <h3 className="font-serif text-lg font-medium line-clamp-1">{book.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
          <div className="flex justify-between items-center">
            <span className="font-medium">${book.price.toFixed(2)}</span>
            <span className="text-xs px-2 py-1 bg-book-paper rounded-full">{book.category}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
