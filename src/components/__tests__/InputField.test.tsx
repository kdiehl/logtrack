import { render, fireEvent } from "@testing-library/react";
import InputField from "../InputField";

describe("InputField component", () => {
  const initialValue = "initial";
  const placeholderText = "Enter text";
  const nameAttribute = "test";
  const changedValue = "changed";
  const inputClass =
    "w-full p-2 mb-4 border border-gray-300 dark:bg-gray-600 dark:border-gray-500 rounded";

  it("renders with correct initial value", () => {
    const { getByDisplayValue } = render(
      <InputField
        name={nameAttribute}
        placeholder={placeholderText}
        value={initialValue}
        onChange={() => {}}
      />,
    );
    expect(getByDisplayValue(initialValue)).toBeInTheDocument();
  });

  it("renders with correct placeholder", () => {
    const { getByPlaceholderText } = render(
      <InputField
        name={nameAttribute}
        placeholder={placeholderText}
        value=""
        onChange={() => {}}
      />,
    );
    expect(getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  it("calls onChange handler when value changes", () => {
    const handleChange = jest.fn();
    const { getByDisplayValue } = render(
      <InputField
        name={nameAttribute}
        placeholder={placeholderText}
        value={initialValue}
        onChange={handleChange}
      />,
    );
    fireEvent.change(getByDisplayValue(initialValue), {
      target: { value: changedValue },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders with correct name attribute", () => {
    const { getByDisplayValue } = render(
      <InputField
        name={nameAttribute}
        placeholder={placeholderText}
        value={initialValue}
        onChange={() => {}}
      />,
    );
    expect(getByDisplayValue(initialValue)).toHaveAttribute(
      "name",
      nameAttribute,
    );
  });

  it("renders with correct classes", () => {
    const { container } = render(
      <InputField
        name={nameAttribute}
        placeholder={placeholderText}
        value={initialValue}
        onChange={() => {}}
      />,
    );
    expect(container.firstChild).toHaveClass(inputClass);
  });
});
