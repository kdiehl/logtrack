import React from "react";
import { render, fireEvent } from "@testing-library/react";
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
    const { getByRole } = render(<ThemeToggle />);
    expect(getByRole("checkbox")).not.toBeChecked();
  });

  it("renders with dark theme initially", () => {
    (useSettings as jest.Mock).mockReturnValue({
      theme: darkTheme,
      setTheme: mockSetTheme,
    });
    const { getByRole } = render(<ThemeToggle />);
    expect(getByRole("checkbox")).toBeChecked();
  });

  it("toggles to dark theme when clicked", () => {
    const { getByRole } = render(<ThemeToggle />);
    fireEvent.click(getByRole("checkbox"));
    expect(mockSetTheme).toHaveBeenCalledWith(darkTheme);
  });

  it("toggles to light theme when clicked", () => {
    (useSettings as jest.Mock).mockReturnValue({
      theme: darkTheme,
      setTheme: mockSetTheme,
    });
    const { getByRole } = render(<ThemeToggle />);
    fireEvent.click(getByRole("checkbox"));
    expect(mockSetTheme).toHaveBeenCalledWith(lightTheme);
  });

  it("updates to dark theme when theme changes in the database", () => {
    const { rerender, getByRole } = render(<ThemeToggle />);
    (useSettings as jest.Mock).mockReturnValue({
      theme: darkTheme,
      setTheme: mockSetTheme,
    });
    rerender(<ThemeToggle />);
    expect(getByRole("checkbox")).toBeChecked();
  });

  it("updates to light theme when theme changes in the database", () => {
    const { rerender, getByRole } = render(<ThemeToggle />);
    (useSettings as jest.Mock).mockReturnValue({
      theme: lightTheme,
      setTheme: mockSetTheme,
    });
    rerender(<ThemeToggle />);
    expect(getByRole("checkbox")).not.toBeChecked();
  });
});
