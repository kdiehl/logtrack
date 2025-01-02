// src/components/TextAreaField.tsx
import React from "react";

interface TextAreaFieldProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-2 mb-4 border border-gray-300 dark:bg-gray-600 dark:border-gray-500 rounded"
    />
  );
};

export default TextAreaField;
