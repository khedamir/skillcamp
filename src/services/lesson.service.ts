import axios from "axios";
import { LessonData } from "../redux/types";

export const lessonService = {
  async getLesson(courseId: number, lessonId: number): Promise<LessonData> {
    const { data } = await axios.get(`/api/lessons/${courseId}/${lessonId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },
};
