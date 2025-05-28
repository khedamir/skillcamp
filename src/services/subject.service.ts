import axios from "axios";
import { CourseData } from "../redux/types";

export const subjectService = {
  async getSubjects(): Promise<CourseData[]> {
    const { data } = await axios.get("/api/subject", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },

  async getSubject(id: string): Promise<CourseData> {
    const { data } = await axios.get(`/api/subject/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });
    return data.data[0];
  },

  async getUserOnSubject(id: string): Promise<any> {
    const { data } = await axios.get(`/api/profiles/on/subject/${id}`);
    return data;
  },

  async setLastSubject(id: string): Promise<CourseData> {
    const { data } = await axios.post(`/api/profile/subject/${id}`, undefined, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });
    return data.data[0];
  },
};
