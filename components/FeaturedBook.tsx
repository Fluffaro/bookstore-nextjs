import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface FeaturedBookProps {
  book: Book;
}

const FeaturedBook = ({ book }: FeaturedBookProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Get existing cart from local storage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if book is already in cart
    const existingItem = cart.find((item: any) => item.book.id === book.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ book, quantity: 1 });
    }
    
    // Save updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Sonner toast notification
    toast.success(`✅ ${book.title} has been added to your cart.`, {
      duration: 3000,
    });
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
              onClick={addToCart}
              className="bg-white text-book-dark hover:bg-white/90 transition-colors"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            
            <Link to={`/book/${book.id}`}>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                size="lg"
              >
                View Details
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBook;
