import { render } from "@testing-library/react";
import Card from "../Card";

describe("Card component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<Card>Test Content</Card>);
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("renders without children", () => {
    const { container } = render(<Card></Card>);
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
