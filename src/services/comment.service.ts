import axios from "axios";
import { AnswerData, CommentData } from "../redux/types";

export const commentService = {
  async getComments(lessonId: number): Promise<CommentData[]> {
    const { data } = await axios.get(`/api/comments/${lessonId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },

  async getAnswers(commentId: number): Promise<AnswerData[]> {
    const { data } = await axios.get(`/api/admin/reply/${commentId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },

  async addComment(comment: {
    content: string;
    theme_id: number;
  }): Promise<CommentData[]> {
    const { data } = await axios.post(`/api/comments`, comment, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },

  async addAnswer(comment: {
    content: string;
    comment_id: number;
  }): Promise<CommentData[]> {
    const { data } = await axios.post(`/api/admin/reply`, comment, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },

  async deleteComment(commentId: number): Promise<any> {
    const { data } = await axios.delete(`/api/comments/${commentId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },
};
