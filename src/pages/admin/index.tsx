import { useState, useEffect } from "react";
import { CourseData } from "../../redux/types";
import { subjectService } from "../../services/subject.service";
import SearchCourse from "../../components/searchCourse";
import AdminCourseCard from "../../components/adminCourseCard";
import Button from "../../components/button";
import ChangeCourse from "../../components/changeCourse";

const Admin = () => {
  const [coursesList, setCoursesList] = useState<CourseData[]>([]);
  const [filteredCoursesList, setFilteredCoursesList] = useState<CourseData[]>(
    []
  );
  const [active, setActive] = useState(false);

  const updateList = () => {
    subjectService.getSubjects().then((data) => {
      setCoursesList(data);
      setFilteredCoursesList(data);
    });
  };

  useEffect(() => {
    updateList();
  }, []);

  const addNewCourseClick = () => {
    setActive(true);
  };

  return active ? (
    <ChangeCourse setActive={setActive} />
  ) : (
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
          <AdminCourseCard
            key={course.id}
            updateList={updateList}
            course={course}
            setActive={setActive}
          />
        ))}
      </div>
    </div>
  );
};

export default Admin;
