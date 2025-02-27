import { useState } from 'react';
import { categories } from '@/lib/data';
interface CategoryFilterProps {
  selectedCategory: string | null;
  onChange: (category: string | null) => void;
}
const CategoryFilter = ({ selectedCategory, onChange }: CategoryFilterProps) => {
  return (
    <div className="mb-8 overflow-x-auto pb-2">
      <div className="flex space-x-2">
        <button
          className={`px-4 py-2 rounded-full transition-all duration-300 text-sm whitespace-nowrap ${
            selectedCategory === null
              ? 'bg-book-accent text-white shadow-md'
              : 'bg-book-paper hover:bg-book-paper/80'
          }`}
          onClick={() => onChange(null)}
        >
          All Books
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full transition-all duration-300 text-sm whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-book-accent text-white shadow-md'
                : 'bg-book-paper hover:bg-book-paper/80'
            }`}
            onClick={() => onChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
export default CategoryFilter;