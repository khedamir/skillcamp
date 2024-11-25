import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import InputWrapper from "../../components/inputWrapper";
import AuthFormWrapper from "../../components/authFormWrapper";
import { registerSchemes } from "../../utils/validationsSchemes";
import { userRegisterService } from "../../services/auth.service";
import { CiUser } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import PasswordInput from "../../components/passwrodInput";

type FormValuesType = {
  username: string;
  email: string;
  password: string;
};

const Signin = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValuesType>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (value: FormValuesType) => {
    setIsLoading(true);
    userRegisterService
      .userRegister(value.username, value.email, value.password)
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
    <AuthFormWrapper link="/login" linkText="Есть аккаунт? Войдите.">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper
          errorMessage={errors.username?.message}
          error={errors.username}
          icon={<CiEdit className="icon" />}
        >
          <input
            type="text"
            placeholder="ФИО"
            {...register("username", registerSchemes.username)}
          />
        </InputWrapper>
        <InputWrapper
          errorMessage={errors.email?.message}
          error={errors.email}
          icon={<CiUser className="icon" />}
        >
          <input
            type="email"
            placeholder="Email"
            {...register("email", registerSchemes.email)}
          />
        </InputWrapper>
        <PasswordInput
          error={errors.password}
          {...register("password", registerSchemes.password)}
        />
        <Button disabled={isLoading}>Зарегистрироваться</Button>
        {error && <span className="auth-page__error">{error}</span>}
      </form>
    </AuthFormWrapper>
  );
};

export default Signin;
