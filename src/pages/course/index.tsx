import { useEffect, useState } from "react";
import { CourseData, ThemeData } from "../../redux/types";
import { subjectService } from "../../services/subject.service";
import { useNavigate, useParams } from "react-router-dom";
import { themeService } from "../../services/theme.service";
import { GiDiploma } from "react-icons/gi";

import ThemeItem from "../../components/themeItem";
import TestsList from "../../components/testsList";
import { certificateService } from "../../services/certificate.service";
import Button from "../../components/button";
import Loader from "../../components/loader";
import CourseStudents from "../../components/courseStudents";

const Course = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<CourseData>();
  const [themes, setThemes] = useState<ThemeData[]>([]);
  const [doneThemes, setDoneThemes] = useState<number[]>([]);
  const navigate = useNavigate();

  const [isCertificated, setIsSertificated] = useState(false);

  useEffect(() => {
    subjectService.getSubject(String(courseId)).then((data) => {
      setCourse(data);

      subjectService.setLastSubject(String(courseId));

      themeService.getThemes(data.id).then((data) => {
        setThemes(data);
      });
      themeService.getDoneThemes(data.id).then((data) => {
        setDoneThemes(data);
      });

      certificateService
        .certificateVerification(String(courseId))
        .then((res) => {
          if (res.courseDone) {
            setIsSertificated(true);
          }
        });
    });
  }, [courseId]);

  if (!course) {
    return <Loader />;
  }

  return (
    <div className="course-page page-container">
      <header className="course-header">
        <h1 className="course-name">{course.title}</h1>
        <div className="course-description">
          <h2>О курсе</h2>
          {isCertificated && course.iscertificated == "true" && (
            <Button
              onClick={() => {
                alert(
                  "В данный момент приложение находиться в бета тестировании сертификаты будут добавлены в будующих обновления. Ваши сертификаты сохранятся"
                );
                navigate(`/certificate/${course.id}`);
              }}
              otherClass="button-blue certificate-btn"
            >
              <GiDiploma /> Получить сертификат
            </Button>
          )}
          <p>{course.description}</p>
        </div>
      </header>
      <CourseStudents courseId={course.id} />
      <div className="course-themes">
        <h2 className="course-themes__title">Уроки</h2>
        <div className="course-themes__list">
          {themes?.map((theme) => (
            <ThemeItem
              key={theme.id}
              theme={theme}
              is_done={Boolean(
                doneThemes?.find((themeId) => themeId === theme.id)
              )}
            />
          ))}
        </div>
        <TestsList courseId={course.id} />
      </div>
    </div>
  );
};

export default Course;
