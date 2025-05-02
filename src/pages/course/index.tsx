import { useEffect, useState } from "react";
import { CourseData, ThemeData } from "../../redux/types";
import { subjectService } from "../../services/subject.service";
import { useParams } from "react-router-dom";
import { themeService } from "../../services/theme.service";

import ThemeItem from "../../components/themeItem";
import TestsList from "../../components/testsList";

const Course = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<CourseData>();
  const [themes, setThemes] = useState<ThemeData[]>([]);
  const [doneThemes, setDoneThemes] = useState<number[]>([]);

  useEffect(() => {
    subjectService.getSubject(String(courseId)).then((data) => {
      setCourse(data);
      themeService.getThemes(data.id).then((data) => {
        setThemes(data);
      });
      themeService.getDoneThemes(data.id).then((data) => {
        setDoneThemes(data);
      });
    });
  }, [courseId]);

  if (!course) {
    return;
  }

  return (
    <div className="course-page page-container">
      <header className="course-header">
        <h1 className="course-name">{course.title}</h1>
        <div className="course-description">
          <h2>О курсе</h2>
          <p>{course.description}</p>
        </div>
      </header>
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
