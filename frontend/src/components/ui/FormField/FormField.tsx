import "./FormField.css";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  required = false,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor} className="form-label">
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      {children}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}
