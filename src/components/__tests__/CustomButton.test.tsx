import { fireEvent, render, screen } from "@testing-library/react";
import CustomButton from "../CustomButton";

describe("CustomButton component", () => {
  describe("add preset", () => {
    it("renders with add preset styles", () => {
      render(
        <CustomButton preset="add" onClick={() => {}}>
          Add
        </CustomButton>,
      );
      expect(screen.getByText("Add")).toHaveClass(
        "px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-700",
      );
    });

    it("triggers onClick event", () => {
      const handleClick = jest.fn();
      render(
        <CustomButton preset="add" onClick={handleClick}>
          Add
        </CustomButton>,
      );
      fireEvent.click(screen.getByText("Add"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("submit preset", () => {
    it("renders with submit preset styles", () => {
      render(
        <CustomButton preset="submit" onClick={() => {}}>
          Submit
        </CustomButton>,
      );
      expect(screen.getByText("Submit")).toHaveClass(
        "px-2 py-1 text-white bg-green-500 rounded hover:bg-green-700",
      );
    });

    it("triggers onClick event", () => {
      const handleClick = jest.fn();
      render(
        <CustomButton preset="submit" onClick={handleClick}>
          Submit
        </CustomButton>,
      );
      fireEvent.click(screen.getByText("Submit"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("secondary preset", () => {
    it("renders with secondary preset styles", () => {
      render(
        <CustomButton preset="secondary" onClick={() => {}}>
          Secondary
        </CustomButton>,
      );
      expect(screen.getByText("Secondary")).toHaveClass(
        "px-2 py-1 text-white bg-gray-500 rounded hover:bg-gray-700",
      );
    });

    it("triggers onClick event", () => {
      const handleClick = jest.fn();
      render(
        <CustomButton preset="secondary" onClick={handleClick}>
          Secondary
        </CustomButton>,
      );
      fireEvent.click(screen.getByText("Secondary"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("alert preset", () => {
    it("renders with alert preset styles", () => {
      render(
        <CustomButton preset="alert" onClick={() => {}}>
          Alert
        </CustomButton>,
      );
      expect(screen.getByText("Alert")).toHaveClass(
        "px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700",
      );
    });

    it("triggers onClick event", () => {
      const handleClick = jest.fn();
      render(
        <CustomButton preset="alert" onClick={handleClick}>
          Alert
        </CustomButton>,
      );
      fireEvent.click(screen.getByText("Alert"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("success preset", () => {
    it("renders with success preset styles", () => {
      render(
        <CustomButton preset="success" onClick={() => {}}>
          Success
        </CustomButton>,
      );
      expect(screen.getByText("Success")).toHaveClass(
        "px-2 py-1 text-white bg-green-500 rounded hover:bg-green-700",
      );
    });

    it("triggers onClick event", () => {
      const handleClick = jest.fn();
      render(
        <CustomButton preset="success" onClick={handleClick}>
          Success
        </CustomButton>,
      );
      fireEvent.click(screen.getByText("Success"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
