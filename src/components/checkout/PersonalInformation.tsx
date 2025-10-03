interface Person {
  fullName: string;
  address: string;
  city: string;
  country: string;
}

/**
 * Displays a person's shipping address.
 *
 * @param {Person} props - The personal information to display
 * @returns {JSX.Element} JSX for the shipping address
 */
const PersonalInformation = ({ fullName, address, city, country }: Person) => {
  return (
    <div className="border-1 rounded p-4 my-4 bg-yellow-50">
      <p className="font-semibold text-lg">Shipping address:</p>
      <p>{fullName}</p>
      <p>{address},</p>
      <p>
        {city} {country}
      </p>
    </div>
  );
};

export default PersonalInformation;
