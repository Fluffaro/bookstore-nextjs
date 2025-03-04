"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

interface OrderType {
  id: number;
  orderDate: string;
  totalAmount: number;
  orderItems: {
    id: number;
    bookTitle: string;
    bookAuthor: string;
    price: number;
    quantity: number;
  }[];
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to view order history.");
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch orders. Status: ${response.status}`);
        }

        const text = await response.text();
        console.log("📦 Raw API Response:", text); // Debugging log

        const data = JSON.parse(text);
        console.log("✅ Parsed Orders:", JSON.stringify(data, null, 2)); // Pretty-print API response

        if (!Array.isArray(data)) {
          throw new Error("Invalid order data format received.");
        }

        setOrders(data);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
        setOrders([]); // Prevent undefined state
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading) return <p>Loading order history...</p>;

  return (
    <SidebarProvider className="shadow-xl">
      <div className="flex flex-row flex-1">
        <AppSidebar />

        <div className="flex flex-col flex-1 p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">📦 Order History</h1>

          {orders.length === 0 ? (
            <p>No past orders found.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="border p-4 mb-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                <p className="text-sm text-gray-500">Placed on: {new Date(order.orderDate).toLocaleString()}</p>
                <p className="text-sm font-semibold">Total: ${order.totalAmount.toFixed(2)}</p>

                <ul className="mt-2">
                  {order.orderItems?.map((item) => (
                    <li key={item.id} className="border-b pb-2 mb-2">
                      <p className="text-sm font-medium">{item.bookTitle} ({item.quantity}x)</p>
                      <p className="text-xs text-gray-500">{item.bookAuthor}</p>
                      <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}

          <Button variant="outline" className="mt-4" onClick={() => router.push("/")}>🏠 Back to Home</Button>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default OrderHistory;
