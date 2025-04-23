import BaseButton from "../components/ui/BaseButton";
import { BiCart } from "react-icons/bi";

const Homepage = () => {
  return (
    <div className="bg-red-400">
      Hello I am homepage{" "}
      <BaseButton variant="ghost" className="p-0.5" disabled>
        <BiCart className="text-4xl" />
      </BaseButton>{" "}
    </div>
  );
};

export default Homepage;
