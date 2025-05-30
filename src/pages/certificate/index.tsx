import React, { useEffect, useRef, useState } from "react";
// import "./Certificate.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { certificateService } from "../../services/certificate.service";
import { profileService } from "../../services/profile.service";
import Button from "../../components/button";
// import { CertificateVerification } from "../../services/cerificated";

// Типы данных
interface UserProfile {
  full_name: string;
}

interface Subject {
  title: string;
}

interface VerificationResponse {
  courseDone: boolean;
  date: string;
}

const Certificate: React.FC = () => {
  const certificateRef = useRef<HTMLDivElement | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    // Получение профиля пользователя
    profileService
      .getData()
      .then((res) => {
        setUserProfile(res);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          navigate("/");
        }
      });

    // Получение данных курса
    axios
      .get<{ data: Subject[] }>(`/api/subject/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("SKUToken")}`,
        },
      })
      .then((resp) => {
        const subjectData = resp.data.data[0];
        setSubject(subjectData);
      });

    // Проверка завершения курса
    certificateService
      .certificateVerification(String(courseId))
      .then((res: VerificationResponse) => {
        if (res.courseDone) {
          // const formattedDate = res.date.split("T")[0].split("-").join(".");
          // setDate(formattedDate);
          const [year, month, day] = res.date.split("T")[0].split("-");
          const formattedDate = `${day}.${month}.${year}`;
          setDate(formattedDate);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/");
      });
  }, [courseId, navigate]);

  const generatePDF = () => {
    const input = certificateRef.current;
    if (!input) return;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("certificate.pdf");
      navigate(`/courses/${courseId}`);
    });
  };

  return (
    <div className="certificate-page page-container">
      <Button onClick={generatePDF}>Скачать PDF</Button>

      <div className="certificate-container">
        <div ref={certificateRef} className="certificate">
          {userProfile && <p className="name">{userProfile.full_name}</p>}
          {subject && <p className="course">{subject.title}</p>}
          {date && <p className="date">{date}</p>}
        </div>
      </div>
    </div>
  );
};

export default Certificate;
