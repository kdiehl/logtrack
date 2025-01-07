import { render } from "@testing-library/react";
import Modal from "../Modal";

describe("Modal component", () => {
  const modalContent = "This is the modal content";

  it("renders children when isOpen is true", () => {
    const { getByText } = render(<Modal isOpen={true}>{modalContent}</Modal>);
    expect(getByText(modalContent)).toBeInTheDocument();
  });

  it("does not render children when isOpen is false", () => {
    const { queryByText } = render(
      <Modal isOpen={false}>{modalContent}</Modal>,
    );
    expect(queryByText(modalContent)).not.toBeInTheDocument();
  });
});
