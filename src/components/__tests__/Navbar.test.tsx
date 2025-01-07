import React from "react";
import { render } from "@testing-library/react";
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
    const { getByText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    expect(getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(getByText("Tickets").closest("a")).toHaveAttribute(
      "href",
      "/tickets",
    );
    expect(getByText("Archived Tickets").closest("a")).toHaveAttribute(
      "href",
      "/tickets/archive",
    );
    expect(getByText("Settings").closest("a")).toHaveAttribute(
      "href",
      "/settings",
    );
  });
});
