import { useState, useEffect } from "react";
import { CourseData } from "../../redux/types";
import { subjectService } from "../../services/subject.service";
import SearchCourse from "../../components/searchCourse";
import AdminCourseCard from "../../components/adminCourseCard";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [coursesList, setCoursesList] = useState<CourseData[]>([]);
  const [filteredCoursesList, setFilteredCoursesList] = useState<CourseData[]>(
    []
  );

  const navigate = useNavigate();

  useEffect(() => {
    subjectService.getSubjects().then((data) => {
      setCoursesList(data);
      setFilteredCoursesList(data);
    });
  }, []);

  const addNewCourseClick = () => {
    navigate("/admin-course");
  };

  return (
    <div className="admin-page page-container">
      <header className="admin-page__header">
        <h2 className="title">Курсы</h2>
        <Button onClick={addNewCourseClick}>Добавить новый курс</Button>
      </header>
      <SearchCourse
        courses={coursesList}
        setFilteredCourses={setFilteredCoursesList}
      />
      <div className="courses-list">
        {filteredCoursesList.map((course) => (
          <AdminCourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Admin;
