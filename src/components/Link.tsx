// src/components/Link.tsx
import React from "react";

interface LinkProps {
  url: string;
  text: string;
}

const Link: React.FC<LinkProps> = ({ url, text }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="text-blue-500 dark:text-blue-400 underline"
    >
      {text}
    </a>
  );
};

export default Link;
