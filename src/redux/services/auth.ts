import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserInfo } from "../types";

interface UserRegisterProps {
  username: string;
  email: string;
  password: string;
}

interface UserLoginProps {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi", // Уникальный ключ для подключения в store
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL, // Базовый URL
  }),
  endpoints: (builder) => ({
    userRegister: builder.mutation<UserInfo, UserRegisterProps>({
      query: ({ username, email, password }) => ({
        url: "/api/reg",
        method: "POST",
        body: {
          id: "",
          username,
          email,
          password,
          create_date: "",
        },
      }),
    }),
    userLogin: builder.mutation<UserInfo, UserLoginProps>({
      query: ({ email, password }) => ({
        url: "/api/auth",
        method: "POST",
        body: {
          id: "",
          email,
          password,
          create_date: "",
        },
      }),
    }),
    userAutharization: builder.mutation({
      query: () => ({
        url: "/api/authorization",
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("SKUToken"),
        },
      }),
    }),
  }),
});

export const { useUserRegisterMutation, useUserLoginMutation } = authApi;
