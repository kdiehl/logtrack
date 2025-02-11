// src/App.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock components that are not necessary for the tests
jest.mock("./components/Navbar", () => () => <div>Mocked Navbar</div>);
jest.mock("./pages/HomePage", () => () => <div>Mocked HomePage</div>);
jest.mock("./tickets/ArchivedTickets", () => () => (
  <div>Mocked ArchivedTickets</div>
));
jest.mock("./tickets/ActiveTickets", () => () => <div>Mocked JiraTickets</div>);
jest.mock("./settings/SettingsPage", () => () => <div>Mocked SettingsPage</div>);

describe("App", () => {
  test("renders Navbar", () => {
    render(<App />);
    expect(screen.getByText("Mocked Navbar")).toBeInTheDocument();
  });

  test("renders HomePage on default route", () => {
    render(<App />);
    expect(screen.getByText("Mocked HomePage")).toBeInTheDocument();
  });

  test("renders JiraTickets on /tickets route", () => {
    window.history.pushState({}, "Tickets Page", "/tickets");
    render(<App />);
    expect(screen.getByText("Mocked JiraTickets")).toBeInTheDocument();
  });

  test("renders ArchivedTickets on /tickets/archive route", () => {
    window.history.pushState({}, "Archived Tickets Page", "/tickets/archive");
    render(<App />);
    expect(screen.getByText("Mocked ArchivedTickets")).toBeInTheDocument();
  });

  test("renders SettingsPage on /settings route", () => {
    window.history.pushState({}, "Settings Page", "/settings");
    render(<App />);
    expect(screen.getByText("Mocked SettingsPage")).toBeInTheDocument();
  });
});
