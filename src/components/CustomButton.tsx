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
        return "px-2 py-1 text-white bg-green-500 dark:bg-green-700 rounded hover:bg-green-700 dark:hover:bg-green-900";
      case "add":
        return "px-2 py-1 text-white bg-blue-500 dark:bg-blue-700 rounded hover:bg-blue-700 dark:hover:bg-blue-900";
      case "alert":
        return "px-2 py-1 text-white bg-red-500 dark:bg-red-700 rounded hover:bg-red-700 dark:hover:bg-red-900";
      case "submit":
        return "px-2 py-1 text-white bg-green-500 dark:bg-green-700 rounded hover:bg-green-700 dark:hover:bg-green-900";
      case "secondary":
        return "px-2 py-1 text-white bg-gray-500 dark:bg-gray-700 rounded hover:bg-gray-700 dark:hover:bg-gray-900";
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
