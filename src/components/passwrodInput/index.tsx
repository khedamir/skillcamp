import { forwardRef, useState } from "react";
import InputWrapper from "../inputWrapper";
import { CiLock } from "react-icons/ci";
import { CiRead } from "react-icons/ci";
import { CiUnread } from "react-icons/ci";
import { FieldError } from "react-hook-form";

interface PasswordInputProps {
  error: FieldError | undefined;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error, ...inputProps }, ref) => {
    const [isPassView, setIsPassView] = useState(true);
    return (
      <InputWrapper
        errorMessage={error?.message}
        error={error}
        icon={<CiLock className="icon" />}
      >
        <input
          placeholder="Пароль"
          name="password"
          type={isPassView ? "text" : "password"}
          ref={ref}
          {...inputProps}
        />
        {isPassView ? (
          <CiUnread onClick={() => setIsPassView(false)} className="passread" />
        ) : (
          <CiRead onClick={() => setIsPassView(true)} className="passread" />
        )}
      </InputWrapper>
    );
  }
);

export default PasswordInput;
