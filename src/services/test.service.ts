import axios from "axios";
import { ComplatedTestData, TestData } from "../redux/types";

export const testService = {
  async getTestsBySubjectId(subjectId: number): Promise<TestData[]> {
    const { data } = await axios.get(`/api/test/${subjectId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },

  async getComplatedTestsBySubjectId(
    subjectId: number
  ): Promise<ComplatedTestData[]> {
    const { data } = await axios.get(`/api/test/for/${subjectId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },

  async getAllComplatedtests(userId: string): Promise<number> {
    const { data } = await axios.get(`/api/test/${userId}/all`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },
};
