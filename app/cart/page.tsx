"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { toast } from "sonner";
interface BookType {
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  coverImage: string;
  category: string;
  featured: boolean;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [removeQuantity, setRemoveQuantity] = useState<{ [key: number]: number }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast("You must be logged in to view your cart.");
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
        const formattedCart = Array.isArray(data)
          ? data.map((item) => ({
              id: item.book.id,
              title: item.book.title,
              author: item.book.author || "Unknown Author",
              price: item.book.price,
              description: item.book.description,
              coverImage: item.book.coverImage,
              category: item.book.category,
              featured: item.book.featured,
              quantity: item.quantity,
            }))
          : [];

        setCartItems(formattedCart);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [router]);

  const updateQuantity = async (bookId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(bookId);
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      toast("You must be logged in to update your cart.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId, quantity: newQuantity }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update quantity. Status: ${response.status}`);
      }
  
      // ✅ Update frontend state after successful backend update
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.id === bookId ? { ...item, quantity: newQuantity } : item
        )
      );
  
      toast("🛒 Cart updated successfully!");
    } catch (error) {
      console.error("❌ Error updating quantity:", error);
      toast("❌ Failed to update cart.");
    }
  };
  

  const removeItem = async (bookId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast("You must be logged in to remove items.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/cart/remove?bookId=${bookId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to remove item. Status: ${response.status}`);
      }
  
      // ✅ Update frontend state after successful removal
      setCartItems((prevCart) => prevCart.filter((item) => item.id !== bookId));
  
      toast("🗑️ Item removed from cart!");
    } catch (error) {
      console.error("❌ Error removing item:", error);
      toast("❌ Failed to remove item.");
    }
  };
  

  // ✅ **Move `checkout` function outside of `updateQuantity`**
  const checkout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast("You must be logged in to checkout.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/orders/checkout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Checkout failed. Status: ${response.status}`);
      }

      toast("✅ Order placed successfully!");
      router.push("/order-history"); // Redirect to Order History page
    } catch (error) {
      console.error("Error during checkout:", error);
      toast("❌ Failed to place order.");
    }
  };

  if (loading) return <div>Loading cart...</div>;

  const totalPrice = cartItems.reduce((sum, book) => sum + book.price * book.quantity, 0);

  return (
    <SidebarProvider className="shadow-xl">
      <div className="flex flex-row flex-1">
        <AppSidebar />
        <div className="flex flex-col flex-1 p-6 max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">🛒 Your Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((book) => (
                <div key={book.id} className="flex justify-between items-center p-2 border-b">
                  <div>
                    <h3 className="text-lg font-semibold">{book.title}</h3>
                    <p className="text-sm text-gray-500">{book.author}</p>
                    <p className="text-sm">Quantity: {book.quantity}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(book.id, book.quantity - 1)}>
                      -
                    </Button>

                    <input
                      type="number"
                      min="1"
                      max={book.quantity}
                      value={removeQuantity[book.id] || 1}
                      onChange={(e) => setRemoveQuantity({ ...removeQuantity, [book.id]: Number(e.target.value) })}
                      className="w-12 border rounded text-center"
                    />

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newQuantity = book.quantity - (removeQuantity[book.id] || 1);
                        if (newQuantity <= 0) removeItem(book.id);
                        else updateQuantity(book.id, newQuantity);
                      }}
                    >
                      Remove
                    </Button>

                    <Button variant="destructive" size="sm" onClick={() => removeItem(book.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-right text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</div>

              {/* ✅ Checkout Button Now Works! */}
              <Button 
                className="mt-4 w-full bg-green-600 text-white"
                onClick={checkout}
              >
                ✅ Place Order
              </Button>
            </>
          )}

          <Button variant="outline" className="mt-4" onClick={() => router.push("/")}>
            🏠 Back to Home
          </Button>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CartPage;
