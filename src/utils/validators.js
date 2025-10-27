import { REGEX } from '../constants';

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  return REGEX.EMAIL.test(email.trim());
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid phone
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  return REGEX.PHONE.test(phone.trim());
};

/**
 * Validate ZIP code
 * @param {string} zipCode - ZIP code to validate
 * @returns {boolean} Is valid ZIP code
 */
export const isValidZipCode = (zipCode) => {
  if (!zipCode) return false;
  return REGEX.ZIP_CODE.test(zipCode.trim());
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with strength level
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, strength: 'none', message: 'Password is required' };
  }

  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return {
      isValid: false,
      strength: 'weak',
      message: `Password must be at least ${minLength} characters`,
    };
  }

  let strength = 0;
  if (hasUpperCase) strength++;
  if (hasLowerCase) strength++;
  if (hasNumbers) strength++;
  if (hasSpecialChar) strength++;

  const strengthLevels = {
    1: { level: 'weak', message: 'Weak password' },
    2: { level: 'fair', message: 'Fair password' },
    3: { level: 'good', message: 'Good password' },
    4: { level: 'strong', message: 'Strong password' },
  };

  const result = strengthLevels[strength] || strengthLevels[1];

  return {
    isValid: strength >= 2,
    strength: result.level,
    message: result.message,
  };
};

/**
 * Validate credit card number (Luhn algorithm)
 * @param {string} cardNumber - Card number to validate
 * @returns {boolean} Is valid card number
 */
export const isValidCreditCard = (cardNumber) => {
  if (!cardNumber) return false;

  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (!/^\d+$/.test(cleaned)) return false;
  if (cleaned.length < 13 || cleaned.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {object} Validation result
 */
export const validateRequired = (value) => {
  const isValid = value !== null && value !== undefined && value !== '';
  return {
    isValid,
    message: isValid ? '' : 'This field is required',
  };
};

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length
 * @returns {object} Validation result
 */
export const validateMinLength = (value, minLength) => {
  const isValid = value && value.length >= minLength;
  return {
    isValid,
    message: isValid ? '' : `Must be at least ${minLength} characters`,
  };
};

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length
 * @returns {object} Validation result
 */
export const validateMaxLength = (value, maxLength) => {
  const isValid = !value || value.length <= maxLength;
  return {
    isValid,
    message: isValid ? '' : `Must be no more than ${maxLength} characters`,
  };
};

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {object} Validation result
 */
export const validateRange = (value, min, max) => {
  const num = parseFloat(value);
  const isValid = !isNaN(num) && num >= min && num <= max;
  return {
    isValid,
    message: isValid ? '' : `Must be between ${min} and ${max}`,
  };
};

/**
 * Validate form data
 * @param {object} formData - Form data to validate
 * @param {object} rules - Validation rules
 * @returns {object} Validation errors
 */
export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field];
    const value = formData[field];

    if (fieldRules.required && !validateRequired(value).isValid) {
      errors[field] = 'This field is required';
      return;
    }

    if (fieldRules.email && value && !isValidEmail(value)) {
      errors[field] = 'Please enter a valid email';
      return;
    }

    if (fieldRules.phone && value && !isValidPhone(value)) {
      errors[field] = 'Please enter a valid phone number';
      return;
    }

    if (fieldRules.minLength && value) {
      const result = validateMinLength(value, fieldRules.minLength);
      if (!result.isValid) {
        errors[field] = result.message;
        return;
      }
    }

    if (fieldRules.maxLength && value) {
      const result = validateMaxLength(value, fieldRules.maxLength);
      if (!result.isValid) {
        errors[field] = result.message;
        return;
      }
    }

    if (fieldRules.pattern && value && !fieldRules.pattern.test(value)) {
      errors[field] = fieldRules.patternMessage || 'Invalid format';
      return;
    }

    if (fieldRules.custom) {
      const result = fieldRules.custom(value, formData);
      if (!result.isValid) {
        errors[field] = result.message;
      }
    }
  });

  return errors;
};