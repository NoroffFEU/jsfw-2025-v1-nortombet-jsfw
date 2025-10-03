import { useState, useEffect } from "react";

interface ExpiryDateInputProps {
  onExpiryChange: (expiry: string) => void;
  currentExpiry?: string;
}

const ExpiryDateInput = ({
  onExpiryChange,
  currentExpiry = "",
}: ExpiryDateInputProps) => {
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, index) => currentYear + index);

  useEffect(() => {
    if (currentExpiry) {
      const [currentMonth, currentYear] = currentExpiry
        .split("/")
        .map((val) => val.trim());
      setMonth(currentMonth);
      setYear(currentYear);
    }
  }, [currentExpiry]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMonth(value);
    onExpiryChange(`${value}/${year}`);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setYear(value);
    onExpiryChange(`${month}/${value}`);
  };

  const isValidExpiry = (expiry: string): boolean => {
    const [expiryMonth, expiryYear] = expiry
      .split("/")
      .map((val) => parseInt(val.trim(), 10));
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear() % 100;

    if (
      expiryYear < currentYear ||
      (expiryYear === currentYear && expiryMonth < currentMonth)
    ) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <p className="block text-sm font-medium mb-1">Expiry Date (MM/YY)</p>
      <div className="flex space-x-2">
        <select
          value={month}
          onChange={handleMonthChange}
          className="w-16 sm:w-20 p-1 border rounded transition-all duration-700 bg-gray-50"
          aria-label="Select month of expiry date for credit card"
        >
          <option value="">MM</option>
          {[...Array(12)].map((_, index) => {
            const monthValue = (index + 1).toString().padStart(2, "0");
            return (
              <option key={monthValue} value={monthValue}>
                {monthValue}
              </option>
            );
          })}
        </select>

        <span className="text-xl">/</span>

        <select
          value={year}
          onChange={handleYearChange}
          className="w-16 sm:w-20 p-1 border rounded transition-all duration-700 bg-gray-50"
          aria-label="Select year of expiry date for credit card"
        >
          <option value="">YY</option>
          {years.map((yearValue) => {
            const yearShort = yearValue.toString().slice(-2);
            return (
              <option key={yearValue} value={yearShort}>
                {yearShort}
              </option>
            );
          })}
        </select>
      </div>

      {!isValidExpiry(`${month}/${year}`) && month && year && (
        <p className="text-red-500 text-sm mt-2">
          This expiry date is in the past
        </p>
      )}
    </div>
  );
};

export default ExpiryDateInput;
