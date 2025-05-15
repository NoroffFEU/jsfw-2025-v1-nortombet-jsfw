import { Link } from "react-router-dom";

type ProgressStep = {
  name: string;
  path: string;
};

type ProgressBarProps = {
  steps: ProgressStep[];
  currentStep: number;
};

const ProgressBar = ({ steps, currentStep }: ProgressBarProps) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex items-center relative">
        {steps.map((step, index) => (
          <div key={step.name} className="flex items-center">
            <div className="relative">
              <Link to={currentStep > index ? step.path : "#"}>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300
                    ${currentStep > index ? "bg-green-500 border-green-500 text-white" : ""}
                    ${currentStep === index ? "border-blue-500 bg-white text-blue-500" : ""}
                    ${currentStep < index ? "border-gray-500 bg-white text-gray-500" : ""}
                    ${currentStep > index ? "shadow-lg" : "shadow-md"}
                  `}
                >
                  {index + 1}
                </div>
              </Link>

              <div
                className={`absolute mt-2 font-medium text-center w-24 -left-6
                ${currentStep >= index ? "text-black  text-lg" : "text-black"}`}
              >
                {step.name}
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`h-1 w-12 sm:w-24 mx-2 transition-all duration-500
                  ${currentStep > index ? "bg-green-500" : "bg-gray-500"}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
