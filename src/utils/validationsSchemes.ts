const emailScheme = {
  required: "Это поле обязательное",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Неверный адрес электронной почты",
  },
};

const passwordScheme = {
  required: "Это поле обязательное",
  // pattern: {
  //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/,
  //   message:
  //     "Пароль может содержать только буквы верхнего и нижнего регистра и цифры. Также допускаются указанные спецсимволы (@, $, !, %, *, ?, &). Длина пароля должна быть от 8 до 20 символов.",
  // },
};

export const loginSchemes = {
  email: emailScheme,
  password: {
    required: "Это поле обязательно",
  },
};

export const registerSchemes = {
  username: {
    required: "Это поле обязательно",
  },
  email: emailScheme,
  password: passwordScheme,
};
