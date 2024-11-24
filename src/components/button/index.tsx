import React, { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  otherClass?: string;
}

const Button: FC<ButtonProps> = ({ children, otherClass = "" }) => {
  return <button className={`button ${otherClass}`}>{children}</button>;
};

export default Button;
