import InputWrapper from "../../components/inputWrapper";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import Logo from "../../assets/logo.svg";
import Button from "../../components/button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-page__form">
        <header className="login-page__header">
          <img src={Logo} alt="" />
        </header>
        <form action="">
          <InputWrapper icon={<CiUser className="icon" />}>
            <input type="email" placeholder="Email" />
          </InputWrapper>
          <InputWrapper icon={<CiLock className="icon" />}>
            <input type="text" placeholder="Пароль" />
          </InputWrapper>
          <Button>Войти</Button>
        </form>
        <Link to="/signin" className="login-page__link">
          Нет аккаунта? Зарегистрируйтесь.
        </Link>
      </div>
    </div>
  );
};

export default Login;
