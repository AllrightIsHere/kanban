import "./Input.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ className = "", error, ...props }: InputProps) {
  return (
    <input
      className={`input ${error ? "input-error" : ""} ${className}`}
      {...props}
    />
  );
}
