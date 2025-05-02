import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
  otherClass?: string;
}
const Button: FC<ButtonProps> = ({
  children,
  disabled,
  otherClass = "",
  ...rest
}) => {
  return (
    <button {...rest} className={`button ${otherClass}`} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
