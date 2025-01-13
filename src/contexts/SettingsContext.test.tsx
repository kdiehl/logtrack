import { render, screen, waitFor } from "@testing-library/react";
import { SettingsProvider, useSettings } from "./SettingsContext";
import { db } from "../utils/db";
import React, { act } from "react";
import { Theme } from "../settings/Theme";

jest.mock("../utils/db");

const TestComponent = () => {
  const { theme, url, setTheme, setUrl } = useSettings();
  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <div data-testid="url">{url}</div>
      <button onClick={() => setTheme(Theme.Dark)}>Set Dark Theme</button>
      <button onClick={() => setUrl("https://example.com")}>Set URL</button>
    </div>
  );
};

function renderTestComponent() {
  render(
    <SettingsProvider>
      <TestComponent />
    </SettingsProvider>,
  );
}

describe("SettingsContext", () => {
  beforeEach(() => {
    (db.settings.toArray as jest.Mock).mockResolvedValue([
      { id: 1, theme: Theme.Light, url: "" },
    ]);
    (db.settings.put as jest.Mock).mockResolvedValue(undefined);
  });

  it("provides default settings", async () => {
    renderTestComponent();

    await waitFor(() => {
      expect(screen.getByTestId("theme").textContent).toBe(Theme.Light);
      expect(screen.getByTestId("url").textContent).toBe("");
    });
  });

  it("loads settings from the database", async () => {
    (db.settings.toArray as jest.Mock).mockResolvedValue([
      { id: 1, theme: Theme.Dark, url: "https://example.com" },
    ]);

    renderTestComponent();

    await waitFor(() => {
      expect(screen.getByTestId("theme").textContent).toBe(Theme.Dark);
      expect(screen.getByTestId("url").textContent).toBe("https://example.com");
    });
  });

  it("updates theme and saves to the database", async () => {
    renderTestComponent();

    act(() => {
      screen.getByText("Set Dark Theme").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("theme").textContent).toBe(Theme.Dark);
    });

    expect(db.settings.put).toHaveBeenCalledWith({
      id: 1,
      theme: Theme.Dark,
      url: "",
    });
  });

  it("updates url and saves to the database", async () => {
    renderTestComponent();

    act(() => {
      screen.getByText("Set URL").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("url").textContent).toBe("https://example.com");
    });

    expect(db.settings.put).toHaveBeenCalledWith({
      id: 1,
      theme: Theme.Light,
      url: "https://example.com",
    });
  });

  it("throws error when useSettings is used outside of SettingsProvider", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useSettings must be used within a SettingsProvider",
    );

    consoleError.mockRestore();
  });
});
