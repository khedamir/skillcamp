import CourseInfoForm from "../../components/adminComponents/courseInfoForm";
import LessonInfoForm from "../../components/adminComponents/lessonInfoForm";
import ThemeInfoForm from "../../components/adminComponents/themeInfoForm";

const AdminCourse = () => {
  return (
    <div className="admin-course__page page-container">
      <header className="admin-page__header">
        <h2 className="title">Редактирование курса</h2>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCourse;
