import React, { ButtonHTMLAttributes } from "react";

type BaseButtonProps = {
  label?: string;
  className?: string;
  variant?: "primary" | "secondary" | "danger";
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * A highly customizable button component with built-in variants and full styling control.
 *
 * @example
 * // Basic usage with label
 * <Button label="Click me" onClick={handleClick} />
 *
 * @example
 * // With custom class and variant
 * <Button
 *   label="Submit"
 *   variant="secondary"
 *   className="w-full py-3 font-bold"
 * />
 *
 * @example
 * // With children instead of label
 * <Button className="flex items-center gap-2">
 *   <Icon name="plus" />
 *   Add Item
 * </Button>
 *
 * @example
 * // Danger variant with all button props
 * <Button
 *   label="Delete"
 *   variant="danger"
 *   disabled={isDeleting}
 *   aria-label="Delete item"
 *   onClick={handleDelete}
 * />
 */
const BaseButton: React.FC<BaseButtonProps> = ({
  label = "Button",
  className = "",
  variant = "primary",
  children,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children || label}
    </button>
  );
};

export default BaseButton;
