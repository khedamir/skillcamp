import { useEffect, useState } from "react";
import { profileService } from "../../services/profile.service";
import { subjectService } from "../../services/subject.service";
import { CourseData } from "../../redux/types";
import CourseCard from "../courseCard";
import Loader from "../loader";

const ProfileLastCourse = () => {
  const [lastSubject, setLastSubject] = useState<CourseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    profileService.getlastSubject().then((data) => {
      subjectService.getSubject(String(data.subjects_id)).then((data) => {
        setLastSubject(data);
        setIsLoading(false);
      });
    });
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="last-course">
      {lastSubject && (
        <>
          <h2 className="last-course__title">Продолжите изучение:</h2>
          <CourseCard course={lastSubject} />
        </>
      )}
    </div>
  );
};

export default ProfileLastCourse;
