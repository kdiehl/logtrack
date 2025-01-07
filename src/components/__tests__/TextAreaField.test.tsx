import React from "react";
import { fireEvent, render } from "@testing-library/react";
import TextAreaField from "../TextAreaField";

describe("TextAreaField", () => {
  const placeholderText = "Enter text";
  const initialValue = "Initial value";
  const nameAttribute = "testName";
  const placeholderAttribute = "Enter your text here";

  it("renders with correct initial value", () => {
    const { getByPlaceholderText } = render(
      <TextAreaField
        name="test"
        placeholder={placeholderText}
        value={initialValue}
        onChange={() => {}}
      />,
    );
    expect(getByPlaceholderText(placeholderText)).toHaveValue(initialValue);
  });

  it("calls onChange handler when text is changed", () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <TextAreaField
        name="test"
        placeholder={placeholderText}
        value=""
        onChange={handleChange}
      />,
    );
    fireEvent.change(getByPlaceholderText(placeholderText), {
      target: { value: "New value" },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders with correct name attribute", () => {
    const { getByPlaceholderText } = render(
      <TextAreaField
        name={nameAttribute}
        placeholder={placeholderText}
        value=""
        onChange={() => {}}
      />,
    );
    expect(getByPlaceholderText(placeholderText)).toHaveAttribute(
      "name",
      nameAttribute,
    );
  });

  it("renders with correct placeholder", () => {
    const { getByPlaceholderText } = render(
      <TextAreaField
        name="test"
        placeholder={placeholderAttribute}
        value=""
        onChange={() => {}}
      />,
    );
    expect(getByPlaceholderText(placeholderAttribute)).toBeInTheDocument();
  });

  it("handles empty value correctly", () => {
    const { getByPlaceholderText } = render(
      <TextAreaField
        name="test"
        placeholder={placeholderText}
        value=""
        onChange={() => {}}
      />,
    );
    expect(getByPlaceholderText(placeholderText)).toHaveValue("");
  });
});
