import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navbar from "../Navbar";

jest.mock("../ThemeToggle", () => () => <div>Mocked ThemeToggle</div>);
jest.mock("react-router", () => ({
  // @ts-ignore
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  // @ts-ignore
  MemoryRouter: ({ children }) => <div>{children}</div>,
}));

describe("Navbar", () => {
  it("renders the correct URLs for navigation links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    expect(screen.getByText("Home")).toHaveAttribute("href", "/");
    expect(screen.getByText("Tickets")).toHaveAttribute("href", "/tickets");
    expect(screen.getByText("Archived Tickets")).toHaveAttribute(
      "href",
      "/tickets/archive",
    );
    expect(screen.getByText("Settings")).toHaveAttribute("href", "/settings");
  });
});
