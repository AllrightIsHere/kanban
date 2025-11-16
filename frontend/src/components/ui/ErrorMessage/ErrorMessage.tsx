import "./ErrorMessage.css";

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <p className="error-text">{message}</p>
      {onDismiss && (
        <button
          className="error-dismiss-btn"
          onClick={onDismiss}
          aria-label="Fechar erro"
        >
          ×
        </button>
      )}
    </div>
  );
}
