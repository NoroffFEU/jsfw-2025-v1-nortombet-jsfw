import { useEffect, useState, useRef, useMemo, forwardRef, useImperativeHandle } from "react";
import { isCardNumberValid, isExpiryValid, isCVVValid } from "../../utility/validateCCInformation";
import ExpiryDateInput from "./CCExpiryDateInputs";

interface CCInformationProps {
  onValidationChange: (isValid: boolean) => void;
}

const CCInformation = forwardRef(({ onValidationChange }: CCInformationProps, ref) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCVV] = useState("");

  const [touched, setTouched] = useState({
    number: false,
    name: false,
    expiry: false,
    cvv: false,
  });

  const [errors, setErrors] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleSegmentChange = (index: number, value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const currentSegments = segments.slice();
    currentSegments[index] = numericValue;

    const newCardNumber = currentSegments.join("").substring(0, 16);
    setCardNumber(newCardNumber);

    if (numericValue.length === 4 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const segments = useMemo(
    () => [
      cardNumber.substring(0, 4),
      cardNumber.substring(4, 8),
      cardNumber.substring(8, 12),
      cardNumber.substring(12, 16),
    ],
    [cardNumber]
  );

  const validateForm = () => {
    const newErrors = {
      number: "",
      name: "",
      expiry: "",
      cvv: "",
    };
    let isValid = true;

    if (!isCardNumberValid(cardNumber)) {
      isValid = false;
      newErrors.number = /[a-zA-Z]/.test(cardNumber)
        ? "Card number must not contain letters."
        : "Card number must be exactly 16 digits.";
    }

    if (!cardName.trim()) {
      isValid = false;
      newErrors.name = "Cardholder name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(cardName)) {
      isValid = false;
      newErrors.name = "Name must contain only letters and spaces.";
    }

    if (!isExpiryValid(expiry)) {
      isValid = false;
      newErrors.expiry = "Expiry must be in MM/YY format and not in the past.";
    }

    if (!isCVVValid(cvv)) {
      isValid = false;
      newErrors.cvv = "CVV must be 3 or 4 digits.";
    }

    return { newErrors, isValid };
  };

  useEffect(() => {
    const { newErrors, isValid } = validateForm();
    setErrors(newErrors);
    onValidationChange(isValid);
  }, [cardNumber, cardName, expiry, cvv]);

  useImperativeHandle(ref, () => ({
    fillCardInfo: (data: { cardNumber?: string; cardName?: string; expiry?: string; cvv?: string }) => {
      if (data.cardNumber) setCardNumber(data.cardNumber);
      if (data.cardName) setCardName(data.cardName);
      if (data.expiry) setExpiry(data.expiry);
      if (data.cvv) setCVV(data.cvv);
    },
  }));

  return (
    <div className="space-y-4 p-4 border rounded-lg shadow ">
      <h2 className="text-2xl font-semibold">Credit Card Information</h2>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="ccNameHolder">
          Cardholder Name
        </label>
        <input
          id="ccNameHolder"
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
          className="w-full p-1 border rounded bg-gray-50"
          inputMode="text"
          pattern="[A-Za-z\s]*"
        />
        {touched.name && errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <fieldset className="grid grid-cols-4 gap-2">
        <legend className="block text-sm font-medium mb-1 w-full col-span-4">Card Number</legend>

        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="flex items-center space-x-1">
            <input
              ref={(el) => {
                if (el) {
                  inputRefs.current[index] = el;
                }
              }}
              type="tel"
              id={`card-segment-${index}`}
              value={segments[index]}
              maxLength={4}
              onChange={(e) => handleSegmentChange(index, e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, number: true }))}
              className="w-full p-1 text-lg border rounded text-center font-mono transition-all duration-700 bg-gray-50"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
        ))}

        {touched.number && errors.number && (
          <p className="text-red-500 text-sm w-full col-span-4 mt-1">{errors.number}</p>
        )}
      </fieldset>

      <div className="grid grid-cols-2 gap-4">
        {/* Expiry Date Input */}
        <div className="col-span-2 sm:col-span-1">
          <ExpiryDateInput onExpiryChange={setExpiry} currentExpiry={expiry} />
          {touched.expiry && errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}
        </div>

        {/* CVV Input */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium mb-1" htmlFor="ccCVV">
            CVV
          </label>
          <input
            id="ccCVV"
            type="tel"
            value={cvv}
            maxLength={4}
            onChange={(e) => setCVV(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, cvv: true }))}
            className="w-full p-1 border rounded bg-gray-50"
          />
          {touched.cvv && errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
        </div>
      </div>
    </div>
  );
});

export default CCInformation;
