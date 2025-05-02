import axios from "axios";
import {
  ComplatedTestData,
  QuestionData,
  TestAnswerData,
  TestData,
} from "../redux/types";

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

  async getQuestions(testId: number): Promise<QuestionData[]> {
    const { data } = await axios.get(`/api/testing/${testId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },

  async checkAnswers(
    testId: number,
    courseId: number,
    answers: TestAnswerData[]
  ): Promise<{ points: number }> {
    const { data } = await axios.post(
      `/api/test/check/${testId}/${courseId}`,
      answers,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("SKUToken"),
        },
      }
    );

    return data;
  },
};
