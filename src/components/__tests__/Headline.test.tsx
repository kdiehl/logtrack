import { render, screen } from "@testing-library/react";
import Headline from "../Headline";

describe("Headline component", () => {
  const testHeadline = "Test Headline";
  const h1Class = "text-gray-800 dark:text-white text-4xl font-bold";
  const h2Class = "text-gray-800 dark:text-white text-2xl font-semibold";
  const h3Class = "text-gray-800 dark:text-white text-xl font-medium";

  describe("h1 preset", () => {
    it("applies h1 preset styles", () => {
      render(<Headline preset="h1">{testHeadline}</Headline>);
      expect(screen.getByText(testHeadline)).toHaveClass(h1Class);
    });
  });

  describe("h2 preset", () => {
    it("applies h2 preset styles", () => {
      render(<Headline preset="h2">{testHeadline}</Headline>);
      expect(screen.getByText(testHeadline)).toHaveClass(h2Class);
    });

    it("applies default preset styles when preset is not provided", () => {
      render(<Headline>{testHeadline}</Headline>);
      expect(screen.getByText(testHeadline)).toHaveClass(h2Class);
    });
  });

  describe("h3 preset", () => {
    it("applies h3 preset styles", () => {
      render(<Headline preset="h3">{testHeadline}</Headline>);
      expect(screen.getByText(testHeadline)).toHaveClass(h3Class);
    });
  });

  it("renders children correctly", () => {
    render(<Headline>{testHeadline}</Headline>);
    expect(screen.getByText(testHeadline)).toBeInTheDocument();
  });
});
