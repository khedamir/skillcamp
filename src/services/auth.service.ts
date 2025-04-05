import axios from "axios";
import { AutharizationInfo } from "../redux/types";

export const userRegisterService = {
  async userRegister(
    username: string,
    email: string,
    password: string
  ): Promise<any> {
    const { data } = await axios.post("/api/sign-up", {
      id: "",
      username,
      email,
      password,
      create_date: "",
    });

    return data;
  },
};

export const userLoginService = {
  async userLogin(email: string, password: string): Promise<any> {
    const { data } = await axios.post("/api/sign-in", {
      id: "",
      email,
      password,
      create_date: "",
    });

    return data;
  },

  async userAutharization(): Promise<AutharizationInfo> {
    const { data } = await axios.post("/api/authorization", undefined, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data;
  },
};
