import axios from "axios";
import { CertificateVerificationData } from "../redux/types";

export const certificateService = {
  async certificateVerification(subjectId: string): Promise<CertificateVerificationData> {
    const { data } = await axios.get(`/api/certificate/${subjectId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SKUToken"),
      },
    });

    return data;
  },
};
