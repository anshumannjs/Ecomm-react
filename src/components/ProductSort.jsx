import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import Select from './Select';
import { SORT_OPTIONS } from '../constants';

const ProductSort = ({ value, onChange, className = '' }) => {
  return (
    <div className={className}>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={SORT_OPTIONS}
        placeholder="Sort by"
        className="min-w-[200px]"
      />
    </div>
  );
};

export default ProductSort;