import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Input from './Input';
import Select from './Select';
import Checkbox from './Checkbox';
import Button from './Button';
import { selectUserAddresses } from '../features/auth/authSlice';
import { validateForm } from '../utils/validators';

const ShippingForm = ({ onSubmit, onBack }) => {
  const savedAddresses = useSelector(selectUserAddresses);
  const [useExisting, setUseExisting] = useState(savedAddresses.length > 0);
  const [selectedAddressId, setSelectedAddressId] = useState(
    savedAddresses.find((addr) => addr.isDefault)?.id || savedAddresses[0]?.id || ''
  );

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (useExisting && selectedAddressId) {
      const selectedAddress = savedAddresses.find((addr) => addr.id === parseInt(selectedAddressId));
      onSubmit(selectedAddress);
      return;
    }

    // Validate form
    const validationRules = {
      fullName: { required: true, minLength: 2 },
      email: { required: true, email: true },
      phone: { required: true, phone: true },
      street: { required: true, minLength: 5 },
      city: { required: true, minLength: 2 },
      state: { required: true },
      zipCode: { required: true },
      country: { required: true },
    };

    const validationErrors = validateForm(formData, validationRules);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Use Existing Address */}
      {savedAddresses.length > 0 && (
        <div className="space-y-4">
          <Checkbox
            label="Use saved address"
            checked={useExisting}
            onChange={(e) => setUseExisting(e.target.checked)}
          />

          {useExisting && (
            <div className="space-y-3 pl-7">
              {savedAddresses.map((address) => (
                <label
                  key={address.id}
                  className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary-300 transition-colors"
                >
                  <input
                    type="radio"
                    name="savedAddress"
                    value={address.id}
                    checked={selectedAddressId === address.id}
                    onChange={(e) => setSelectedAddressId(parseInt(e.target.value))}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{address.fullName}</span>
                      {address.isDefault && (
                        <span className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {address.street}
                      {address.apartment && `, ${address.apartment}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p className="text-sm text-gray-600">{address.phone}</p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* New Address Form */}
      {(!useExisting || savedAddresses.length === 0) && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              required
              fullWidth
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              fullWidth
            />
          </div>

          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
            fullWidth
          />

          <Input
            label="Street Address"
            name="street"
            value={formData.street}
            onChange={handleChange}
            error={errors.street}
            required
            fullWidth
          />

          <Input
            label="Apartment, Suite, etc. (Optional)"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            fullWidth
          />

          <div className="grid md:grid-cols-3 gap-4">
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              required
              fullWidth
            />

            <Input
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              error={errors.state}
              required
              fullWidth
            />

            <Input
              label="ZIP Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              error={errors.zipCode}
              required
              fullWidth
            />
          </div>

          <Select
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            options={[
              { value: 'United States', label: 'United States' },
              { value: 'Canada', label: 'Canada' },
              { value: 'United Kingdom', label: 'United Kingdom' },
              { value: 'Australia', label: 'Australia' },
            ]}
            required
            fullWidth
          />

          <Checkbox label="Save this address for future orders" />
        </>
      )}

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        {onBack && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onBack}
          >
            Back
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
        >
          Continue to Payment
        </Button>
      </div>
    </form>
  );
};

export default ShippingForm;