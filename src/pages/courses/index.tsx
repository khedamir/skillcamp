import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { subjectService } from "../../services/subject.service";
import CourseCard from "../../components/courseCard";
import { CourseData } from "../../redux/types";
import SearchCourse from "../../components/searchCourse";

const Courses = () => {
  const [coursesList, setCoursesList] = useState<CourseData[]>([]);
  const [filteredCoursesList, setFilteredCoursesList] = useState<CourseData[]>(
    []
  );

  useEffect(() => {
    subjectService.getSubjects().then((data) => {
      setCoursesList(data);
      setFilteredCoursesList(data);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Курсы</title>
      </Helmet>

      <div className="courses-page page-container">
        <header className="courses-page__header">
          <SearchCourse
            courses={coursesList}
            setFilteredCourses={setFilteredCoursesList}
          />
        </header>
        <div className="courses-list">
          {filteredCoursesList.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}

          <div className="course-card">
            <img
              className="course-image"
              src="https://www.computersciencedegreehub.com/wp-content/uploads/2023/02/shutterstock_535124956-scaled.jpg"
              alt=""
            />

            <div className="course-meta">
              <div className="course-themes">10 тем</div>
              <div className="course-progress">15%</div>
            </div>

            <div className="course-description">
              <h3>Основы Python</h3>
              <p>
                Описание курса по пайтон. Много описания курса по пайтон.
                Отличный курс по пайтон. Записывайся чувак.
              </p>
              <button className="button">Продолжить</button>
            </div>
          </div>

          <div className="course-card">
            <img
              className="course-image"
              src="https://www.computersciencedegreehub.com/wp-content/uploads/2023/02/shutterstock_535124956-scaled.jpg"
              alt=""
            />

            <div className="course-meta">
              <div className="course-themes">10 тем</div>
              <div className="course-progress">15%</div>
            </div>

            <div className="course-description">
              <h3>Основы Python</h3>
              <p>
                Описание курса по пайтон. Много описания курса по пайтон.
                Отличный курс по пайтон. Записывайся чувак.
              </p>
              <button className="button">Продолжить</button>
            </div>
          </div>

          <div className="course-card">
            <img
              className="course-image"
              src="https://www.computersciencedegreehub.com/wp-content/uploads/2023/02/shutterstock_535124956-scaled.jpg"
              alt=""
            />

            <div className="course-meta">
              <div className="course-themes">10 тем</div>
              <div className="course-progress">15%</div>
            </div>

            <div className="course-description">
              <h3>Основы Python</h3>
              <p>
                Описание курса по пайтон. Много описания курса по пайтон.
                Отличный курс по пайтон. Записывайся чувак.
              </p>
              <button className="button">Продолжить</button>
            </div>
          </div>

          <div className="course-card">
            <img
              className="course-image"
              src="https://www.computersciencedegreehub.com/wp-content/uploads/2023/02/shutterstock_535124956-scaled.jpg"
              alt=""
            />

            <div className="course-meta">
              <div className="course-themes">10 тем</div>
              <div className="course-progress">15%</div>
            </div>

            <div className="course-description">
              <h3>Основы Python</h3>
              <p>
                Описание курса по пайтон. Много описания курса по пайтон.
                Отличный курс по пайтон. Записывайся чувак.
              </p>
              <button className="button">Продолжить</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
