import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FeaturedBook from '@/components/FeaturedBook';
import BookCard from '@/components/BookCard';
import CategoryFilter from '@/components/CategoryFilter';
import { useRouter } from 'next/navigation';

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

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
      fetchTasks(storedToken);
    }
  }, []);

  const fetchTasks = async (token: string) => {
    try {
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddToCart = async (task: TaskType, quantity = 1) => {
    if (!token) return alert("You must be logged in to add to cart");
    try {
      const payload = { bookId: task.id, quantity };
      const response = await fetch(`${CART_API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
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
    <div className="min-h-screen bg-book-cream page-transition">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16">
          {/* Optional: Feature a random task */}
          {tasks.length > 0 && <FeaturedBook book={tasks[0]} />}
        </section>
        
        {/* Category Filter */}
        <section className="container mx-auto px-4 mb-4">
          <h2 className="text-3xl font-serif font-medium mb-6">Explore Our Collection</h2>
          <CategoryFilter selectedCategory={selectedCategory} onChange={setSelectedCategory} />
        </section>

        {/* Book Grid */}
        <section className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tasks.map((task) => (
              <BookCard key={task.id} book={task} className="animate-fade-up" onAddToCart={() => handleAddToCart(task)} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
