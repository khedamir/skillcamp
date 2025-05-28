import { FC } from "react";
import CourseInfoForm from "../../components/adminComponents/courseInfoForm";
import LessonInfoForm from "../../components/adminComponents/lessonInfoForm";
import ThemeInfoForm from "../../components/adminComponents/themeInfoForm";
import Button from "../../components/button";
import { useAppDispatch } from "../../redux/hooks";
import { setInitialData } from "../../redux/admin/slice";
import { IoCloseOutline } from "react-icons/io5";

interface ChangeCourseProps {
  setActive: (v: boolean) => void;
}

const ChangeCourse: FC<ChangeCourseProps> = ({ setActive }) => {
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setInitialData());
    setActive(false);
  };

  return (
    <div className="admin-course__page page-container">
      <header className="admin-page__header">
        <h2 className="title">Редактирование курса</h2>
        <Button onClick={onClose}>
          <IoCloseOutline />
        </Button>
      </header>

      <CourseInfoForm />
      <div className="course-themes course-data__wrapper">
        <h3>Добавление урока</h3>
        <div className="lesson-data">
          <ThemeInfoForm />
          <LessonInfoForm />
        </div>
      </div>

      <div className="course-data__wrapper">
        <h3>Добавленнные уроки</h3>
        <div className="theme-list">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="theme-list__item">
              <p>Название темы</p>
              <Button>Редактировать</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangeCourse;
