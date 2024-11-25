import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";

interface AuthFormWrapperProps {
  linkText: string;
  link: string;
  children: ReactNode;
}

const AuthFormWrapper: FC<AuthFormWrapperProps> = ({
  children,
  link,
  linkText,
}) => {
  return (
    <div className="auth-page">
      <div className="auth-page__form">
        <header className="auth-page__header">
          <img src={Logo} alt="" />
        </header>
        {children}
        <Link to={link} className="auth-page__link">
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default AuthFormWrapper;