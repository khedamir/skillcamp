import { FC, useEffect, useState } from "react";
import { subjectService } from "../../services/subject.service";
import { UserOnSubjectData } from "../../redux/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface CourseStudentsProps {
  courseId: number;
  max?: number;
}

const CourseStudents: FC<CourseStudentsProps> = ({ courseId, max = 3 }) => {
  const [users, setUsers] = useState<UserOnSubjectData[]>([]);
  const { autharizationData } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    subjectService.getUserOnSubject(String(courseId)).then((result) => {
      if (result) {
        setUsers(result);
      }
    });
  }, []);

  // Берем только первые 3 элемента или меньше, если массив короче
  const displayedUsers = users.slice(0, max);
  const extraCount = users.length - max;

  return (
    <div className="course-students">
      <span className="course-students__avatars">
        {displayedUsers.map((user) => (
          <span key={user.id} className="course-students__avatar">
            {user.full_name[0]}
          </span>
        ))}
      </span>
      {extraCount > 0 && (
        <span className="course-students__count">+{extraCount}</span>
      )}
      <span className="course-students__description">
        {users.length === 1
          ? users[0].id === autharizationData?.user_id
            ? "вы проходите курс"
            : "проходит курс"
          : users.length > 1 && "проходят курс"}
      </span>
    </div>
  );
};

export default CourseStudents;
