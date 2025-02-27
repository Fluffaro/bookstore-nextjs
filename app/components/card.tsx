import { ShoppingCart } from "lucide-react";
import React from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button"; 

interface TaskType {
  id: number;
  completed: boolean;
  title: string;
  author: string;
  subheading?: string;
  price: number;
}

interface CardProps {
  task: TaskType;
  onAddToCart: (task: TaskType) => void; // Define function type
}

const Card = ({ task, onAddToCart }: CardProps) => {
    const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onAddToCart(task); // Now this only triggers the function from Home.tsx
      };
      
      

  return (
    <div className="flex flex-col p-2 rounded-xl border w-64 shadow-md hover:scale-105">
      <div className="flex w-full justify-between items-center p-2">
        <div className="flex flex-col gap-0">
          <div className="text-xl font-semibold">{task.title}</div>
          <div className="text-xs text-slate-500">{task.author || "No author listed"}</div>
        </div>
      </div>
      <div className="border-t p-2 flex justify-between items-center">
        <h3 className="text-xs">${task.price}</h3>

        {/* 🛒 Shopping Cart Button */}
        <Button variant="outline" size="icon" onClick={handleAddToCart}>
          <ShoppingCart className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default Card;
