import "./Textarea.css";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ className = "", error, ...props }: TextareaProps) {
  return (
    <textarea
      className={`textarea ${error ? "textarea-error" : ""} ${className}`}
      {...props}
    />
  );
}
