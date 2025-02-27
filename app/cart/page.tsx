"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface TaskType {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number; // Include quantity field
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to view your cart.");
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch cart. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Cart API Response:", data); // Debugging log

        // Transform response structure: Extract `book` details and merge `quantity`
        const formattedCart = Array.isArray(data)
          ? data.map((item) => ({
              id: item.book.id,
              title: item.book.title,
              author: item.book.author || "Unknown Author",
              price: item.book.price,
              quantity: item.quantity, // Assign quantity correctly
            }))
          : [];

        setCartItems(formattedCart);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]); // Prevent undefined state
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [router]);

  if (loading) return <div>Loading cart...</div>;

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, task) => sum + task.price * task.quantity, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">🛒 Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((task) => (
            <div key={task.id} className="flex justify-between items-center p-2 border-b">
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.author}</p>
                <p className="text-sm">Quantity: {task.quantity}</p>
              </div>
              <p className="text-sm font-semibold">${(task.price * task.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="mt-4 text-right text-lg font-semibold">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </>
      )}

      <Button variant="outline" className="mt-4" onClick={() => router.push("/")}>
        🏠 Back to Home
      </Button>
    </div>
  );
};

export default CartPage;
