import { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  otherClass?: string;
}

const Button: FC<ButtonProps> = ({ children, disabled, otherClass = "" }) => {
  return (
    <button className={`button ${otherClass}`} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
