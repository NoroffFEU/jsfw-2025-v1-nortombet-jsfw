import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "./SearchInput";
import { describe, it, expect, vi } from "vitest";

describe("SearchInput", () => {
  it("renders the input with correct placeholder and value", () => {
    render(<SearchInput value="shoes" onChange={() => {}} />);

    const input = screen.getByPlaceholderText("Search products...");
    expect(input).toBeInTheDocument();
    expect((input as HTMLInputElement).value).toBe("shoes");
  });

  it("calls onChange when user types", () => {
    const mockOnChange = vi.fn();
    render(<SearchInput value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText("Search products...");
    fireEvent.change(input, { target: { value: "shirt" } });

    expect(mockOnChange).toHaveBeenCalledWith("shirt");
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
