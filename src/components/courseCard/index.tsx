import { FC } from "react";
import { CourseData } from "../../redux/types";
import { baseUrl } from "../../App";
import { getTopicLabel } from "../../utils/getTopicLabel";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  course: CourseData;
}

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  const calculateProgress = (): string => {
    if (course.total_themes === 0) return "0%";
    return `${Math.floor(
      (course.completed_themes / course.total_themes) * 100
    )}%`;
  };

  const goToCoursePage = (id: number) => {
    navigate(`/courses/${id}`);
  };

  return (
    <div onClick={() => goToCoursePage(course.id)} className="course-card">
      <img
        className="course-image"
        src={`${baseUrl}/images?id=` + course.image}
        alt=""
      />

      <div className="course-meta">
        <div className="course-themes">
          {getTopicLabel(course.total_themes)}
        </div>
        <div className="course-progress">{calculateProgress()}</div>
      </div>

      <div className="course-description">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <button className="button">
          {course.completed_themes == 0 ? "Начать" : "Продолжить"}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
