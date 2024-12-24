// src/components/CustomButton.tsx
import React, { ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode;
  preset: "add" | "submit" | "secondary" | "alert" | "success";
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  preset,
  onClick,
  children,
}) => {
  const getButtonStyles = () => {
    switch (preset) {
      case "success":
        return "px-2 py-1 text-white bg-green-500 rounded hover:bg-green-700";
      case "add":
        return "px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-700";
      case "alert":
        return "px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700";
      case "submit":
        return "px-2 py-1 text-white bg-green-500 rounded hover:bg-green-700";
      case "secondary":
        return "px-2 py-1 text-white bg-gray-500 rounded hover:bg-gray-700";
      default:
        return "";
    }
  };

  return (
    <button onClick={onClick} className={getButtonStyles()}>
      {children}
    </button>
  );
};

export default CustomButton;
