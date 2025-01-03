// src/components/Link.tsx
import React from "react";

interface LinkProps {
  ticketUrl: string;
  title: string;
}

const Link: React.FC<LinkProps> = ({ ticketUrl, title }) => {
  return (
    <a
      href={ticketUrl}
      target="_blank"
      rel="noreferrer"
      className="text-blue-500 dark:text-blue-400 underline"
    >
      {title}
    </a>
  );
};

export default Link;
