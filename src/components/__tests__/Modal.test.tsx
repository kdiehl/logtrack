import { render, screen } from "@testing-library/react";
import Modal from "../Modal";

describe("Modal component", () => {
  const modalContent = "This is the modal content";

  it("renders children when isOpen is true", () => {
    render(<Modal isOpen={true}>{modalContent}</Modal>);
    expect(screen.getByText(modalContent)).toBeInTheDocument();
  });

  it("does not render children when isOpen is false", () => {
    render(<Modal isOpen={false}>{modalContent}</Modal>);
    expect(screen.queryByText(modalContent)).not.toBeInTheDocument();
  });
});
