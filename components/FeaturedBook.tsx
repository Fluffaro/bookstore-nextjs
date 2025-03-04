import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { CART_API_URL } from '@/constants';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  coverImage?: string;
  category?: string;
  featured?: boolean;
}

interface FeaturedBookProps {
  book: Book;
  token: string; // Ensure the user token is passed
}

const FeaturedBook = ({ book, token }: FeaturedBookProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!token) {
      return toast.error("You must be logged in to add to cart.");
    }

    try {
      const payload = { bookId: book.id, quantity: 1 };
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

      toast.success(`✅ ${book.title} has been added to your cart.`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add book to cart.");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl animate-fade-in">
      <div className="absolute inset-0 z-0">
        <div className={`relative w-full h-full ${isLoading ? 'animate-pulse bg-book-paper' : ''}`}>
          <img
            src={book.coverImage}
            alt={book.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsLoading(false)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>
      </div>
      
      <div className="relative z-10 min-h-[500px] flex items-center">
        <div className="max-w-2xl p-12 animate-fade-up">
          <div className="inline-block px-3 py-1 rounded-full bg-book-accent/90 text-white text-sm font-medium mb-6">
            Featured Book
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-4">
            {book.title}
          </h2>
          
          <p className="text-xl text-white/80 mb-2">
            by {book.author}
          </p>
          
          <p className="text-white/70 mb-8 max-w-lg">
            {book.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={handleAddToCart}
              className="bg-white text-book-dark hover:bg-white/90 transition-colors"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            
            <Button 
              variant="outline" 
              className="border-white text-black hover:bg-white/90 transition-colors"
              size="lg"
            >
              View Details
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBook;
