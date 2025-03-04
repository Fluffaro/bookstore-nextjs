import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../lib/data';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface BookCardProps {
  book: Book;
  className?: string;
}

const BookCard = ({ book, className = '' }: BookCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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
    <div 
      className={`book-card rounded-xl overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/book/${book.id}`} className="block h-full">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={book.coverImage}
            alt={book.title}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsLoading(false)}
          />
          {isLoading && (
            <div className="absolute inset-0 bg-book-paper animate-pulse"></div>
          )}
          
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : ''
          }`}>
            <div className="absolute bottom-4 left-4 right-4">
              <Button 
                onClick={addToCart}
                className="w-full bg-white/90 hover:bg-white text-book-dark transition-all duration-300"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white">
          <h3 className="font-serif text-lg font-medium line-clamp-1">{book.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
          <div className="flex justify-between items-center">
            <span className="font-medium">${book.price.toFixed(2)}</span>
            <span className="text-xs px-2 py-1 bg-book-paper rounded-full">{book.category}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
