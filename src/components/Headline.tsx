// src/components/Headline.tsx
import React, { ReactNode } from "react";

interface HeadlineProps {
  children?: ReactNode;
  preset?: "h1" | "h2" | "h3";
}

function getHeadlineClass(preset: string) {
  const classBase = "text-gray-800 dark:text-white";
  switch (preset) {
    case "h1":
      return `${classBase} text-4xl font-bold`;
    case "h2":
      return `${classBase} text-2xl font-semibold`;
    case "h3":
      return `${classBase} text-xl font-medium`;
    default:
      return `${classBase} text-2xl font-semibold`;
  }
}

const Headline: React.FC<HeadlineProps> = ({ children, preset = "h2" }) => {
  const headlineClass = getHeadlineClass(preset);

  return <h2 className={headlineClass}>{children}</h2>;
};

export default Headline;
