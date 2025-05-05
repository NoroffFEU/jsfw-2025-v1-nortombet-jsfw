export interface ContactFormData {
  fullName: string;
  subject: string;
  email: string;
  message: string;
}

export interface FormErrors {
  fullName?: string;
  subject?: string;
  email?: string;
  message?: string;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  onValidationError: (errors: FormErrors) => void;
}
