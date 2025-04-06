import axios from "axios";
import { LeaderBoardUserData, ProfileData } from "../redux/types";

export const profileService = {
  async getData(): Promise<ProfileData> {
    const { data } = await axios.get("/api/profile", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data[0];
  },
  async addPoint(id: number): Promise<any> {
    const { data } = await axios.post(`/api/profile/point/${id}`, undefined, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data;
  },

  async getlastSubject(): Promise<{
    id: number;
    subjects_id: number;
    user_id: string;
  }> {
    const { data } = await axios.get(`/api/profile/subject`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data[0];
  },

  async getLeaderBoard(): Promise<LeaderBoardUserData[]> {
    const { data } = await axios.get(`/api/profiles`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },
};
