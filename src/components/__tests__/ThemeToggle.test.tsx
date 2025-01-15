import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ThemeToggle from "../ThemeToggle";
import { useSettings } from "../../settings/SettingsContext";

jest.mock("../../settings/SettingsContext");

describe("ThemeToggle", () => {
  const mockSetTheme = jest.fn();
  const lightTheme = "light";
  const darkTheme = "dark";

  beforeEach(() => {
    jest.clearAllMocks();
    (useSettings as jest.Mock).mockReturnValue({
      theme: lightTheme,
      setTheme: mockSetTheme,
    });
  });

  it("renders with light theme initially", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("renders with dark theme initially", () => {
    (useSettings as jest.Mock).mockReturnValue({
      theme: darkTheme,
      setTheme: mockSetTheme,
    });
    render(<ThemeToggle />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("toggles to dark theme when clicked", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockSetTheme).toHaveBeenCalledWith(darkTheme);
  });

  it("toggles to light theme when clicked", () => {
    (useSettings as jest.Mock).mockReturnValue({
      theme: darkTheme,
      setTheme: mockSetTheme,
    });
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockSetTheme).toHaveBeenCalledWith(lightTheme);
  });

  it("updates to dark theme when theme changes in the database", () => {
    const { rerender } = render(<ThemeToggle />);
    (useSettings as jest.Mock).mockReturnValue({
      theme: darkTheme,
      setTheme: mockSetTheme,
    });
    rerender(<ThemeToggle />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("updates to light theme when theme changes in the database", () => {
    const { rerender } = render(<ThemeToggle />);
    (useSettings as jest.Mock).mockReturnValue({
      theme: lightTheme,
      setTheme: mockSetTheme,
    });
    rerender(<ThemeToggle />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });
});
