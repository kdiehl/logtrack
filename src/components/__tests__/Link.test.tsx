import { render } from "@testing-library/react";
import Link from "../Link";

describe("Link component", () => {
  const url = "https://example.com";
  const text = "Example";

  it("renders with correct URL", () => {
    const { getByText } = render(<Link url={url} text={text} />);
    expect(getByText(text)).toHaveAttribute("href", url);
  });

  it("renders with correct text", () => {
    const { getByText } = render(<Link url={url} text={text} />);
    expect(getByText(text)).toBeInTheDocument();
  });

  it("opens link in a new tab", () => {
    const { getByText } = render(<Link url={url} text={text} />);
    expect(getByText(text)).toHaveAttribute("target", "_blank");
  });

  it("renders with noreferrer attribute", () => {
    const { getByText } = render(<Link url={url} text={text} />);
    expect(getByText(text)).toHaveAttribute("rel", "noreferrer");
  });

  it("applies correct classes", () => {
    const { container } = render(<Link url={url} text={text} />);
    expect(container.firstChild).toHaveClass(
      "text-blue-500 dark:text-blue-400 underline",
    );
  });
});
