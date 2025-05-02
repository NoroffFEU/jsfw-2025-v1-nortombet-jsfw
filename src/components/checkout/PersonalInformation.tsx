interface Person {
  fullName: string;
  address: string;
  city: string;
  country: string;
}

const PersonalInformation = (props: Person) => {
  return (
    <div className="border-1 rounded p-4 my-4 bg-yellow-50">
      <p className="font-semibold text-lg">Shipping address:</p>
      <p>{props.fullName}</p>
      <p>{props.address},</p>
      <p>
        {props.city} {props.country}
      </p>
    </div>
  );
};

export default PersonalInformation;
