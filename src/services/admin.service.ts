import axios from "axios";
import { CourseData } from "../redux/types";

export const adminService = {
  async createSubject(subjectData: any): Promise<CourseData> {
    const { data } = await axios.post("/api/subject", subjectData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },

  async updateSubject(subjectData: any): Promise<CourseData> {
    const { data } = await axios.put("/api/subject", subjectData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },

  async deleteSubject(subjectId: any): Promise<CourseData> {
    const { data } = await axios.post(`/api/delete/subject?id=${subjectId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },

  async createTheme(themeData: any): Promise<CourseData> {
    const { data } = await axios.post("/api/themes", themeData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },

  async updateTheme(themeData: any, themeId: any): Promise<CourseData> {
    const { data } = await axios.post(`/api/themes/${themeId}`, themeData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },

  async deleteTheme(themeId: any): Promise<CourseData> {
    const { data } = await axios.post(`/api/themes/${themeId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },

  async createLesson(lessonData: any): Promise<CourseData> {
    const { data } = await axios.post("/api/lessons", lessonData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },

  async updateLesson(lessonData: any): Promise<CourseData> {
    const { data } = await axios.put("/api/lessons", lessonData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },
};
