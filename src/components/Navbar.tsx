// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router";
import ThemeToggle from "./ThemeToggle";

const Navbar: React.FC = () => {
  const navItemClassName = "mr-10 text-lg font-semibold";
  return (
    <nav className="bg-blue-500 dark:bg-gray-600 p-4 text-white flex w-full">
      <div className="justify-between w-full flex">
        <h1 className="text-xl font-bold">Logtrack</h1>
        <div className="flex justify-end">
          <div className={navItemClassName}>
            <Link to="/">Home</Link>
          </div>
          <div className={navItemClassName}>
            <Link to="/timeline">Timeline</Link>
          </div>
          <div className={navItemClassName}>
            <Link to="/reports">Reports</Link>
          </div>
          <div className={navItemClassName}>
            <Link to="/settings">Settings</Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
