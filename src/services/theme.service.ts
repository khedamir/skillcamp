import axios from "axios";
import { ThemeData } from "../redux/types";

export const themeService = {
  async getThemes(courseId: number): Promise<ThemeData[]> {
    const { data } = await axios.get(`/api/themes/${courseId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },

  async getDoneThemes(courseId: number): Promise<number[]> {
    const { data } = await axios.get(`/api/themes/complete/${courseId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },

  async getDoneThemesAllLessons(userId: string): Promise<number> {
    const { data } = await axios.get(`/api/themes/completed/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  }
};
