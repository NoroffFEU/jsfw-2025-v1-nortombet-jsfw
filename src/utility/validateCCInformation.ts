/**
 * Validates if the credit card number is exactly 16 digits.
 */
export const isCardNumberValid = (number: string): boolean => {
  return /^\d{16}$/.test(number.trim());
};

/**
 * Validates if the expiry date is in MM/YY format and not in the past.
 */
export const isExpiryValid = (expiry: string): boolean => {
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;

  const [monthStr, yearStr] = expiry.split("/");
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  if (isNaN(month) || isNaN(year) || month < 1 || month > 12) return false;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear() % 100;

  return year > currentYear || (year === currentYear && month >= currentMonth);
};

/**
 * Validates if the CVV is 3 or 4 digits.
 */
export const isCVVValid = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv.trim());
};
