import React, { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import Input from './Input';
import Button from './Button';
import { useToast } from '../hooks/useToast';

const PromoCode = ({ onApply, className = '' }) => {
  const [code, setCode] = useState('');
  const [appliedCode, setAppliedCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleApply = async () => {
    if (!code.trim()) {
      toast.error('Please enter a promo code');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock validation - in real app, validate with backend
      const validCodes = ['WELCOME20', 'SAVE10', 'FREESHIP'];
      
      if (validCodes.includes(code.toUpperCase())) {
        const discount = code.toUpperCase() === 'WELCOME20' ? 20 : 10;
        setAppliedCode({ code: code.toUpperCase(), discount });
        toast.success(`Promo code applied! ${discount}% off`);
        onApply?.({ code: code.toUpperCase(), discount });
      } else {
        toast.error('Invalid promo code');
      }
      
      setLoading(false);
    }, 1000);
  };

  const handleRemove = () => {
    setAppliedCode(null);
    setCode('');
    toast.info('Promo code removed');
    onApply?.(null);
  };

  return (
    <div className={className}>
      {appliedCode ? (
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-900">
                Code "{appliedCode.code}" applied
              </p>
              <p className="text-sm text-green-700">
                {appliedCode.discount}% discount
              </p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="text-green-600 hover:text-green-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter promo code"
            leftIcon={<Tag className="w-4 h-4" />}
            className="flex-1"
          />
          <Button
            onClick={handleApply}
            variant="outline"
            loading={loading}
            disabled={!code.trim()}
          >
            Apply
          </Button>
        </div>
      )}
    </div>
  );
};

export default PromoCode;