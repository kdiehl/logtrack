import React from "react";

interface SelectInputProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  options: string[];
  placeholder: string;
  className?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ value, onChange, options, placeholder, className }) => {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value === "" ? undefined : e.target.value)}
      className={`border rounded-md p-1 ${className}`}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
