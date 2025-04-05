import { FC } from "react";
import { CourseData } from "../../redux/types";

interface AdminCourseCardProps {
  course: CourseData;
}

const AdminCourseCard: FC<AdminCourseCardProps> = ({ course }) => {
  return (
    <div className="admin-course__card">
      <div className="course-info">
        <h3 className="course-title">Введение в SQL{course.title}</h3>
        <p className="course-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          mollitia atque blanditiis eius, et expedita ullam iure ipsam, tempora,
          consectetur perferendis perspiciatis dolor vero quia esse illum veniam
          est ipsa.{course.description}
        </p>
      </div>
    </div>
  );
};

export default AdminCourseCard;
