// @ts-nocheck - Temporary until we resolve all type issues
import React from 'react';
import PhoneInputBase from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// Import default styles for the phone input
import 'react-phone-number-input/style.css';

interface PhoneInputProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  defaultCountry?: string;
  international?: boolean;
  withCountryCallingCode?: boolean;
  inputStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  [key: string]: any; // For any additional props
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value = '',
  onChange,
  placeholder = 'Enter phone number',
  className = '',
  defaultCountry = 'US',
  international = true,
  withCountryCallingCode = true,
  inputStyle = {},
  inputProps = {},
  style = {},
  ...props
}) => {
  // Create a safe onChange handler that won't throw if not provided
  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };
  // Merge input styles and props
  const mergedInputStyle = {
    background: 'transparent',
    color: '#fff',
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: '1rem',
    ...inputStyle,
    ...(inputProps?.style || {})
  };
  
  // Merge all input props
  const mergedInputProps = {
    ...inputProps,
    style: mergedInputStyle,
    placeholder: placeholder
  };

  return (
    <div className={`phone-input-container ${className}`} style={style}>
      <PhoneInputBase
        international={international}
        defaultCountry={defaultCountry}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        withCountryCallingCode={withCountryCallingCode}
        className="phone-input-wrapper"
        inputComponent={({ ...inputComponentProps }) => (
          <input
            className="phone-input"
            {...inputComponentProps}
            {...mergedInputProps}
            style={{
              ...mergedInputStyle,
              ...(inputComponentProps.style || {})
            }}
          />
        )}
        style={{
          '--PhoneInputCountrySelectArrow-color': '#fff',
          '--PhoneInput-color': '#fff',
          '--PhoneInputCountrySelectArrow-opacity': '0.8',
          ...style
        }}
        {...props}
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          .phone-input-container {
            width: 100%;
          }
          
          .phone-input-wrapper {
            width: 100%;
          }
          
          .phone-input {
            width: 100%;
            padding: 0.6rem 1rem;
            border-radius: 12px;
            border: none;
            background: rgba(255, 255, 255, 0.15);
            color: #fff;
            font-size: 1rem;
          }
          
          .phone-input:focus {
            outline: none;
            background: transparent;
          }
          
          .phone-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
          }
          
          .error-message {
            color: #ff6b6b;
            font-size: 0.85rem;
            margin-top: 0.25rem;
            grid-column: 1/3;
          }
        `
      }} />
    </div>
  );
}

export default PhoneInput;
