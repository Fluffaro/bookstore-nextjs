export interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    description: string;
    coverImage: string;
    category: string;
    featured?: boolean;
  }
  
  export interface CartItem {
    book: Book;
    quantity: number;
  }
  
  export const categories = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Science Fiction",
    "Romance",
    "Biography",
    "History",
    "Self-Help",
    "Fantasy",
    "Children's"
  ];
  
  export const books: Book[] = [
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 12.99,
      description: "Set in the Jazz Age on Long Island, this tale of the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan is a timeless exploration of American ideals, dreams, and excess.",
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
      category: "Fiction",
      featured: true
    },
    {
      id: "2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 14.95,
      description: "A gripping, heart-wrenching tale of coming-of-age in a South plagued by racism and prejudice, as seen through the eyes of a young girl named Scout Finch.",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
      category: "Fiction",
      featured: true
    },
    {
      id: "3",
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      price: 24.99,
      description: "An examination of the rise of Homo sapiens from insignificant primates to masters of the world, exploring the cognitive, agricultural, and scientific revolutions.",
      coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2612&ixlib=rb-4.0.3",
      category: "Non-Fiction"
    },
    {
      id: "4",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      price: 16.99,
      description: "Alicia Berenson's life is seemingly perfect. A famous painter married to a successful fashion photographer, she lives in a grand house in London. One evening, her husband returns late from work, and Alicia shoots him five times in the face, and then never speaks another word.",
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=2798&ixlib=rb-4.0.3",
      category: "Mystery"
    },
    {
      id: "5",
      title: "Dune",
      author: "Frank Herbert",
      price: 18.99,
      description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange, a drug capable of extending life and enhancing consciousness.",
      coverImage: "https://images.unsplash.com/photo-1518362165753-587d1b1eebb2?auto=format&fit=crop&q=80&w=2615&ixlib=rb-4.0.3",
      category: "Science Fiction"
    },
    {
      id: "6",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: 9.99,
      description: "A romantic novel of manners that follows the character development of Elizabeth Bennet, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
      coverImage: "https://images.unsplash.com/photo-1603162525937-97a756d7e9f4?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      category: "Romance"
    },
    {
      id: "7",
      title: "Steve Jobs",
      author: "Walter Isaacson",
      price: 22.99,
      description: "The exclusive biography of Steve Jobs, based on more than forty interviews with Jobs conducted over two years—as well as interviews with more than 100 family members, friends, adversaries, competitors, and colleagues.",
      coverImage: "https://images.unsplash.com/photo-1541323419392-5c4d8543e688?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      category: "Biography"
    },
    {
      id: "8",
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      price: 19.99,
      description: "A counterintuitive approach to living a good life, focusing on embracing the negative and looking at adversity in a different light, rather than constantly seeking positivity and avoiding pain.",
      coverImage: "https://images.unsplash.com/photo-1531214159280-079b95d26139?auto=format&fit=crop&q=80&w=2616&ixlib=rb-4.0.3",
      category: "Self-Help"
    }
  ];