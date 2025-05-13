import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "../pages/Contact"; // Update with correct path
import { toast } from "react-toastify";

// Mock the ContactForm component
vi.mock("../components/contact/ContactForm", () => ({
  ContactForm: vi.fn(({ onSubmit, onValidationError }) => (
    <div data-testid="mock-contact-form">
      <button
        data-testid="submit-button"
        onClick={() =>
          onSubmit({
            fullName: "Test User",
            subject: "Test Subject",
            email: "test@example.com",
            message: "Test message content",
          })
        }
      >
        Submit
      </button>
      <button
        data-testid="error-button"
        onClick={() =>
          onValidationError({
            fullName: "Name error",
          })
        }
      >
        Trigger Error
      </button>
    </div>
  )),
}));

// Mock react-toastify
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Contact Page", () => {
  it("shows appropriate notifications on form submission", () => {
    render(<Contact />);

    // Test success notification
    screen.getByTestId("submit-button").click();
    expect(toast.success).toHaveBeenCalledWith(
      "Your message has been sent successfully!",
      expect.anything()
    );

    // Test error notification
    screen.getByTestId("error-button").click();
    expect(toast.error).toHaveBeenCalledWith(
      "Please fix the errors in the form.",
      expect.anything()
    );
  });
});
