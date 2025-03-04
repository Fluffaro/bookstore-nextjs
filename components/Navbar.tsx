"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Home,
  Search,
  ShoppingCart,
  BookText,
  User,
  LogOut,
  ChevronRight,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar";

// Menu Items
const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Catalogue", url: "/books", icon: BookText },
  { title: "Cart", url: "/cart", icon: ShoppingCart },
  { title: "Search", url: "/search", icon: Search },
  { title: "Orders", url: "/orders", icon: Settings },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check for authentication token
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Fetch Cart Data
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.reduce((total: number, item: any) => total + item.quantity, 0));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("Logged out successfully");
    router.push("/login");
  };

  return (
    <>
      {/* ✅ Fixed Top Navbar (for mobile & small screens) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-3 glass-panel shadow-sm" : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* ✅ Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image src="/static-logo.png" alt="Bookstore Logo" width={32} height={32} />
            <span className="font-serif text-2xl tracking-tight">Neil's Bookstore</span>
          </Link>

          {/* ✅ Center Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.slice(0, 3).map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="font-medium hover:text-book-accent transition-colors relative group"
              >
                {item.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-book-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* ✅ Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-book-paper transition-colors">
              <Search className="h-5 w-5" />
            </Button>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-book-paper transition-colors relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-book-accent text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {isLoggedIn ? (
              <Button onClick={handleLogout} variant="ghost" size="icon" className="rounded-full hover:bg-book-paper transition-colors">
                <LogOut className="h-5 w-5" />
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-book-paper transition-colors">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>
<SidebarProvider>
      {/* ✅ Sidebar (For Desktop View) */}
      <Sidebar className="hidden md:block shadow-lg">
        <SidebarContent className="shadow-lg">
          <SidebarGroup>
            {/* ✅ Sidebar Logo */}
            <SidebarGroupLabel className="flex items-center">
              <Image src="/static-logo.png" alt="App Icon" className="mr-3" width={32} height={32} />
              Neil's Bookstore
            </SidebarGroupLabel>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

            {/* ✅ Sidebar Links */}
            <SidebarGroupContent className="ml-2">
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* ✅ Sidebar Footer */}
          <SidebarFooter className="mt-auto flex flex-row items-center">
            <SidebarMenuButton asChild>
              <Link href="/settings" className="h-auto ml-[9.5px] rounded-md hover:bg-gray-100">
                <Settings className="w-10 h-10 block" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
            </SidebarMenuButton>

            {isLoggedIn && (
              <Button onClick={handleLogout} className="ml-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                Logout
              </Button>
            )}
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
      </SidebarProvider>
    </>
  );
}

export default Navbar;
