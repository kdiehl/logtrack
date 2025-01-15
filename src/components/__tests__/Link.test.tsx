import { render, screen } from "@testing-library/react";
import Link from "../Link";

describe("Link component", () => {
  const url = "https://example.com";
  const text = "Example";

  it("renders with correct URL", () => {
    render(<Link url={url} text={text} />);
    expect(screen.getByText(text)).toHaveAttribute("href", url);
  });

  it("renders with correct text", () => {
    render(<Link url={url} text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("opens link in a new tab", () => {
    render(<Link url={url} text={text} />);
    expect(screen.getByText(text)).toHaveAttribute("target", "_blank");
  });

  it("renders with noreferrer attribute", () => {
    render(<Link url={url} text={text} />);
    expect(screen.getByText(text)).toHaveAttribute("rel", "noreferrer");
  });

  it("applies correct classes", () => {
    render(<Link url={url} text={text} />);
    expect(screen.getByText(text)).toHaveClass(
      "text-blue-500 dark:text-blue-400 underline",
    );
  });
});
