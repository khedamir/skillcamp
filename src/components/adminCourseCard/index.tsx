import { FC } from "react";
import { CourseData } from "../../redux/types";

interface AdminCourseCardProps {
  course: CourseData;
}

const AdminCourseCard: FC<AdminCourseCardProps> = ({ course }) => {
  return (
    <div className="admin-course__card">
      <div className="course-info">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description}</p>
      </div>
      <div className="course-buttons">
        <button className="button">Редактировать курс</button>
        <button className="button">Удалить курс</button>
      </div>
    </div>
  );
};

export default AdminCourseCard;
