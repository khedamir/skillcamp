import axios from "axios";

export const testService = {
  async getAllComplatedtests(userId: string): Promise<number> {
    const { data } = await axios.get(`/api/test//${userId}/all`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data.data;
  },
};
