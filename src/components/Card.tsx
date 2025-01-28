import React from "react";

interface CardProps {
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="p-4 bg-white text-black dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:shadow-gray-500 rounded border shadow">
      {children}
    </div>
  );
};

export default Card;
