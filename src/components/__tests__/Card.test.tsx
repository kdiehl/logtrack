import { render, screen } from "@testing-library/react";
import Card from "../Card";

describe("Card component", () => {
  it("renders children correctly", () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders without children", () => {
    render(<Card></Card>);
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });
});
