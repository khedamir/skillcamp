import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import InputWrapper from "../../components/inputWrapper";
import AuthFormWrapper from "../../components/authFormWrapper";
import { loginSchemes } from "../../utils/validationsSchemes";
import { userLoginService } from "../../services/auth.service";
import { CiUser } from "react-icons/ci";
import PasswordInput from "../../components/passwrodInput";

type FormValuesType = {
  email: string;
  password: string;
};

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValuesType>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (value: FormValuesType) => {
    setIsLoading(true);
    userLoginService
      .userLogin(value.email, value.password)
      .then((data) => {
        console.log(data);
        navigate("/courses");
      })
      .catch(({ response }) => {
        setError(response.data.data);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <AuthFormWrapper link="/signin" linkText="Нет аккаунта? Зарегистрируйтесь.">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper
          errorMessage={errors.email?.message}
          error={errors.email}
          icon={<CiUser className="icon" />}
        >
          <input
            type="email"
            placeholder="Email"
            {...register("email", loginSchemes.email)}
          />
        </InputWrapper>
        <PasswordInput
          error={errors.password}
          {...register("password", loginSchemes.password)}
        />
        <Button disabled={isLoading}>Войти</Button>
        {error && <span className="auth-page__error">{error}</span>}
      </form>
    </AuthFormWrapper>
  );
};

export default Login;
