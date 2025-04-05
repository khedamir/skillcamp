import { FC, useEffect, useState } from "react";
import { CourseData } from "../../redux/types";
import { baseUrl } from "../../App";
import { themeService } from "../../services/theme.service";
import { getTopicLabel } from "../../utils/getTopicLabel";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  course: CourseData;
}

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const [themesLength, setThemesLength] = useState<number>(0);
  const [doneThemes, setDoneThemes] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          fetchThemesLength(course.id),
          fetchDoneThemes(course.id),
        ]);
      } catch (err) {
        setError("Не удалось загрузить данные курса");
        console.error("CourseCard error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [course.id]);

  const fetchThemesLength = async (courseId: number) => {
    themeService
      .getThemes(courseId)
      .then((data) => setThemesLength(data.length));
  };

  const fetchDoneThemes = async (courseId: number) => {
    themeService
      .getDoneThemes(courseId)
      .then((data) => setDoneThemes(data?.length || 0));
  };

  const calculateProgress = (): string => {
    if (themesLength === 0) return "0%";
    return `${Math.floor((doneThemes / themesLength) * 100)}%`;
  };

  const goToCoursePage = (id: number) => {
    navigate(`/courses/${id}`);
  };

  if (isLoading) return <div className="course-card loading">Загрузка...</div>;
  if (error) return <div className="course-card error">{error}</div>;

  return (
    <div className="course-card">
      <img
        className="course-image"
        src={`${baseUrl}/images?id=` + course.image}
        alt=""
      />

      <div className="course-meta">
        <div className="course-themes">{getTopicLabel(themesLength)}</div>
        <div className="course-progress">{calculateProgress()}</div>
      </div>

      <div className="course-description">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <button onClick={() => goToCoursePage(course.id)} className="button">
          {doneThemes == 0 ? "Начать" : "Продолжить"}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
