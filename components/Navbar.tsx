import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Book, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation for cart count update
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.reduce((total: number, item: any) => total + item.quantity, 0));
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 glass-panel shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 group"
        >
          <Book className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-serif text-2xl tracking-tight">StoryShelf</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="font-medium hover:text-book-accent transition-colors relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-book-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            to="/books" 
            className="font-medium hover:text-book-accent transition-colors relative group"
          >
            Books
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-book-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            to="/about" 
            className="font-medium hover:text-book-accent transition-colors relative group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-book-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-book-paper transition-colors">
            <Search className="h-5 w-5" />
          </Button>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-book-paper transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-book-accent text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          
          <Link to="/account">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-book-paper transition-colors">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;