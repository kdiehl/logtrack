// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ArchivedTickets from "./tickets/ArchivedTickets";
import Navbar from "./components/Navbar";
import "./App.css";
import ActiveTickets from "./tickets/ActiveTickets";
import { SettingsProvider } from "./settings/SettingsContext";
import SettingsPage from "./pages/SettingsPage";
import Timeline from "./timeline/Timeline";

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <Router>
        <div className="flex flex-col h-screen bg-white dark:bg-gray-700 dark:text-white">
          <Navbar />
          <div className="flex flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route
                path="/tickets"
                element={
                  <div className="flex-1 p-5">
                    <ActiveTickets />
                  </div>
                }
              ></Route>
              <Route
                path="/tickets/archive"
                element={
                  <div className="flex-1 p-5">
                    <ArchivedTickets />
                  </div>
                }
              />
              <Route
                path="/timeline"
                element={
                  <div className="flex-1 p-5">
                    <Timeline />
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </SettingsProvider>
  );
};

export default App;
