"use client"
import { Calendar, Home, Inbox, Search, Settings, ShoppingBasket, BookText } from "lucide-react"
import { LogoutButton as LogoutButton } from "@/components/component/logoutbutton";
import { ChevronRight } from "lucide-react"; 
import Image from "next/image"; // ✅ Import Image
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Catalogue",
    url: "#",
    icon: BookText,
  },
  {
    title: "Cart",
    url: "#",
    icon: ShoppingBasket,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Orders",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
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
        <Sidebar className="shadow-lg">
          <SidebarContent className="shadow-lg">
            <SidebarGroup>
              <SidebarGroupLabel className="">
                <Image src="/starimagepng.png" alt="App Icon" className="mr-3" width={32} height={32} />
                Neil's Bookstore
              </SidebarGroupLabel>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <SidebarGroupContent className="ml-2">
                <SidebarMenu>
  {items.map((item) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <a href={item.url} className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <item.icon />
            <span>{item.title}</span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-500" /> {/* ✅ Add the right arrow */}
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>

              </SidebarGroupContent>
            </SidebarGroup>
    
            <SidebarFooter className="mt-auto flex flex-row items-center ">  
  {/* SidebarMenu is unnecessary if we just want two buttons side by side */}
  
  {/* Settings Button */}
  <SidebarMenuButton asChild>
    <a href="#" className=" h-auto ml-[9.5px] rounded-md hover:bg-gray-100">
      {/* <Settings className="mr-auto ml-[9.5px]" /> */}
      <Settings className="w-10 h-10 block" />
      <span className="text-sm font-medium ">Settings</span>
    </a>
  </SidebarMenuButton>

  {/* Logout Button */}
  <LogoutButton />
</SidebarFooter>

          </SidebarContent>
        </Sidebar>
      );
    }
