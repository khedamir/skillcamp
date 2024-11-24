import axios from "axios";

// axios.defaults.baseURL = process.env.API_URL;

export const userRegisterService = {
  async userRegister(
    username: string,
    email: string,
    password: string
  ): Promise<any> {
    const { data } = await axios.post("/api/reg", {
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
  async userLogin(
    username: string,
    email: string,
    password: string
  ): Promise<any> {
    const { data } = await axios.post("/api/auth", {
      id: "",
      username,
      email,
      password,
      create_date: "",
    });

    return data;
  },
};
