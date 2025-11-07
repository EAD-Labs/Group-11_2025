import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./PasswordInput.css";

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
  disabled?: boolean;
  error?: string;
}

export default function PasswordInput({
  id,
  name,
  value,
  onChange,
  placeholder,
  className = "",
  disabled = false,
  error,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input-container">
      <div className="password-input-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`password-input ${className} ${error ? "error" : ""}`}
          disabled={disabled}
        />
        <button
          type="button"
          className="password-toggle-btn"
          onClick={togglePasswordVisibility}
          disabled={disabled}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff size={20} className="password-icon" />
          ) : (
            <Eye size={20} className="password-icon" />
          )}
        </button>
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
