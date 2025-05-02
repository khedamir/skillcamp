import { FC, ReactNode } from "react";
import { FieldError } from "react-hook-form";

interface InputWrapperProps {
  icon?: ReactNode;
  children: ReactNode;
  error?: FieldError | undefined;
  errorMessage?: string;
}

const InputWrapper: FC<InputWrapperProps> = ({
  children,
  icon,
  errorMessage,
}) => {
  return (
    <div className={`input-field ${errorMessage && "is-error"}`}>
      <span className="input-field__icon">{icon}</span>
      <div className="input-field__inner">{children}</div>
      {errorMessage && (
        <span className="input-field__error">{errorMessage}</span>
      )}
    </div>
  );
};

export default InputWrapper;
