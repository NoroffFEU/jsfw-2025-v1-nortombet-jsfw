import { ContactForm } from "../components/contact/ContactForm";
import { ContactFormData } from "../types/contactTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const handleSubmit = (formData: ContactFormData) => {
    console.log("Form submitted:", formData);

    toast.success("Your message has been sent successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleValidationError = () => {
    toast.error(`Please fix the errors in the form.`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="min-h-svh max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl  text-gray-800 mb-6">
        CONTACT <span className="font-bold text-indigo-400">US</span>{" "}
      </h1>
      <p className="text-gray-600 mb-8">
        Have questions about your order or our products? We're here to help! Fill out the form below and the our team
        will get back to you as soon as possible.
      </p>

      <ContactForm onSubmit={handleSubmit} onValidationError={handleValidationError} />
    </div>
  );
};

export default Contact;
