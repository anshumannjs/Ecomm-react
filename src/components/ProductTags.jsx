import React from 'react';
import { Tag } from 'lucide-react';
import Badge from './Badge';

const ProductTags = ({ tags = [], className = '' }) => {
  if (tags.length === 0) return null;

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      <Tag className="w-4 h-4 text-gray-500" />
      {tags.map((tag, index) => (
        <Badge key={index} variant="default" size="sm">
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default ProductTags;