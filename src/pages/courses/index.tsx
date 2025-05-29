import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { subjectService } from "../../services/subject.service";
import CourseCard from "../../components/courseCard";
import { CourseData } from "../../redux/types";
import SearchCourse from "../../components/searchCourse";
import Loader from "../../components/loader";

const Courses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coursesList, setCoursesList] = useState<CourseData[]>([]);
  const [filteredCoursesList, setFilteredCoursesList] = useState<CourseData[]>(
    []
  );

  useEffect(() => {
    subjectService.getSubjects().then((data) => {
      setCoursesList(data);
      setFilteredCoursesList(data);
      setIsLoading(false);
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

        {isLoading ? (
          <Loader />
        ) : (
          <div className="courses-list">
            {filteredCoursesList.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Courses;
