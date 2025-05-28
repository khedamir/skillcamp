import { FC } from "react";
import { CourseData } from "../../redux/types";
import { adminService } from "../../services/admin.service";
import { useAppDispatch } from "../../redux/hooks";
import { setCourseData, setThemeData } from "../../redux/admin/slice";

interface AdminCourseCardProps {
  course: CourseData;
  updateList: () => void;
  setActive: (v: boolean) => void;
}

const AdminCourseCard: FC<AdminCourseCardProps> = ({
  course,
  updateList,
  setActive,
}) => {
  const dispatch = useAppDispatch();

  const deletCourseClick = () => {
    const isDelete = confirm("Вы уверены что хотите удалить курс?");
    if (isDelete) {
      adminService.deleteSubject(course.id).then(() => {
        updateList();
      });
    }
  };

  const changeCourseClick = () => {
    dispatch(
      setCourseData({
        data: {
          title: course.title,
          description: course.description,
          savedImage: course.image,
          image: null,
          iscertificated: course.iscertificated == "true",
        },
        onEditing: true,
      })
    );
    dispatch(
      setThemeData({
        data: {
          title: "",
          description: "",
          subject_id: course.id,
        },
      })
    );
    setActive(true);
  };

  return (
    <div className="admin-course__card">
      <div className="course-info">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description}</p>
      </div>
      <div className="course-buttons">
        <button onClick={changeCourseClick} className="button">
          Редактировать курс
        </button>
        <button onClick={deletCourseClick} className="button">
          Удалить курс
        </button>
      </div>
    </div>
  );
};

export default AdminCourseCard;
