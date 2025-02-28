import { ShoppingCart } from "lucide-react";
import React from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { CART_API_URL } from "@/constants";

interface BookType {
  id: number;
  title: string;
  author: string;
  price: number;
  description?: string;
  coverImage?: string;
  category?: string;
  featured?: boolean;
}

interface CardProps {
  book: BookType;
  token: String;
}

const Card = ({ book, token }: CardProps) => {


  const handleAddToCart = async (book: BookType, quantity = 1) => {
    console.log("handleAddToCart triggered");
    if (!token) return alert("You must be logged in to add to cart");

    try {
      const payload = { bookId: book.id, quantity };
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
    <div className="flex flex-col p-2 rounded-xl border w-64 shadow-md hover:scale-105">
      <div className="flex w-full justify-between items-center p-2">
        <div className="flex flex-col gap-0">
          <div className="text-xl font-semibold">{book.title}</div>
          <div className="text-xs text-slate-500">{book.author || "No author listed"}</div>
        </div>
      </div>
      <div className="border-t p-2 flex justify-between items-center">
        <h3 className="text-xs">${book.price}</h3>

        {/* 🛒 Shopping Cart Button */}
        <Button variant="outline" size="icon" onClick={() => {
          handleAddToCart(book)
        }}>
          <ShoppingCart className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default Card;

