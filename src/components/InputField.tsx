// src/components/InputField.tsx
import React from "react";

interface InputFieldProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-2 mb-4 border border-gray-300 dark:bg-gray-600 dark:border-gray-500 rounded"
    />
  );
};

export default InputField;
