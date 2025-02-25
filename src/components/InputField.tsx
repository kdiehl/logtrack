// src/components/InputField.tsx
import React from "react";

interface InputFieldProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onEnterPress?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  value,
  onChange,
  className = "",
  onEnterPress,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      className={`w-full p-2 border border-gray-300 dark:bg-gray-600 dark:border-gray-500 rounded ${className}`}
    />
  );
};

export default InputField;
