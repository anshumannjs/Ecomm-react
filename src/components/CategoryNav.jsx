import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Laptop, 
  Shirt, 
  Home as HomeIcon, 
  BookOpen, 
  Dumbbell, 
  Sparkles 
} from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../constants';

const CategoryNav = ({ className = '' }) => {
  const categoryIcons = {
    electronics: Laptop,
    clothing: Shirt,
    home: HomeIcon,
    books: BookOpen,
    sports: Dumbbell,
    beauty: Sparkles,
  };

  const categories = PRODUCT_CATEGORIES.filter((cat) => cat.id !== 'all');

  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="container-custom">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-4">
          {categories.map((category) => {
            const Icon = categoryIcons[category.id];
            
            return (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors whitespace-nowrap font-medium text-sm"
              >
                {Icon && <Icon className="w-4 h-4" />}
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;