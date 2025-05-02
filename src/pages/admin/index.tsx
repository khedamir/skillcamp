import { useState, useEffect } from "react";
import { CourseData } from "../../redux/types";
import { subjectService } from "../../services/subject.service";
import SearchCourse from "../../components/searchCourse";
import AdminCourseCard from "../../components/adminCourseCard";
import Button from "../../components/button";

const Admin = () => {
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
    <div className="admin-page page-container">
      <header className="admin-page__header">
        <h2 className="title">Курсы</h2>
        <Button>Добавить новый курс</Button>
      </header>
      <SearchCourse
        courses={coursesList}
        setFilteredCourses={setFilteredCoursesList}
      />
      <div className="courses-list">
        {filteredCoursesList.map((course) => (
          <AdminCourseCard course={course} />
        ))}
      </div>
    </div>
  );
};

export default Admin;
