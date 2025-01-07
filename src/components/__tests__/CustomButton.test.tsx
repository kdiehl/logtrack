import { render, fireEvent } from "@testing-library/react";
import CustomButton from "../CustomButton";

describe("CustomButton component", () => {
  describe("add preset", () => {
    it("renders with add preset styles", () => {
      const { container } = render(
        <CustomButton preset="add" onClick={() => {}}>
          Add
        </CustomButton>,
      );
      expect(container.firstChild).toHaveClass(
        "px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-700",
      );
    });

    it("triggers onClick event", () => {
      const handleClick = jest.fn();
      const { getByText } = render(
        <CustomButton preset="add" onClick={handleClick}>
          Add
        </CustomButton>,
      );
      fireEvent.click(getByText("Add"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("submit preset", () => {
    it("renders with submit preset styles", () => {
      const { container } = render(
        <CustomButton preset="submit" onClick={() => {}}>
          Submit
        </CustomButton>,
      );
      expect(container.firstChild).toHaveClass(
        "px-2 py-1 text-white bg-green-500 rounded hover:bg-green-700",
      );
    });

    it("triggers onClick event", () => {
      const handleClick = jest.fn();
      const { getByText } = render(
        <CustomButton preset="submit" onClick={handleClick}>
          Submit
        </CustomButton>,
      );
      fireEvent.click(getByText("Submit"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("secondary preset", () => {
    it("renders with secondary preset styles", () => {
      const { container } = render(
        <CustomButton preset="secondary" onClick={() => {}}>
          Secondary
        </CustomButton>,
      );
      expect(container.firstChild).toHaveClass(
        "px-2 py-1 text-white bg-gray-500 rounded hover:bg-gray-700",
      );
    });

    it("triggers onClick event", () => {
      const handleClick = jest.fn();
      const { getByText } = render(
        <CustomButton preset="secondary" onClick={handleClick}>
          Secondary
        </CustomButton>,
      );
      fireEvent.click(getByText("Secondary"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("alert preset", () => {
    it("renders with alert preset styles", () => {
      const { container } = render(
        <CustomButton preset="alert" onClick={() => {}}>
          Alert
        </CustomButton>,
      );
      expect(container.firstChild).toHaveClass(
        "px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700",
      );
    });

    it("triggers onClick event", () => {
      const handleClick = jest.fn();
      const { getByText } = render(
        <CustomButton preset="alert" onClick={handleClick}>
          Alert
        </CustomButton>,
      );
      fireEvent.click(getByText("Alert"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("success preset", () => {
    it("renders with success preset styles", () => {
      const { container } = render(
        <CustomButton preset="success" onClick={() => {}}>
          Success
        </CustomButton>,
      );
      expect(container.firstChild).toHaveClass(
        "px-2 py-1 text-white bg-green-500 rounded hover:bg-green-700",
      );
    });

    it("triggers onClick event", () => {
      const handleClick = jest.fn();
      const { getByText } = render(
        <CustomButton preset="success" onClick={handleClick}>
          Success
        </CustomButton>,
      );
      fireEvent.click(getByText("Success"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
