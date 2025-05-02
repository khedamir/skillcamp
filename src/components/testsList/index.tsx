import { FC, useEffect, useState } from "react";
import { ComplatedTestData, TestData } from "../../redux/types";
import { testService } from "../../services/test.service";
import TestItem from "./testItem";

interface TestsListProps {
  courseId: number;
}

const TestsList: FC<TestsListProps> = ({ courseId }) => {
  const [tests, setTests] = useState<TestData[]>([]);
  const [complatedTests, setComplatedTests] = useState<
    ComplatedTestData[] | null
  >([]);

  useEffect(() => {
    testService
      .getTestsBySubjectId(courseId)
      .then((data) => setTests(data))
      .then(() => testService.getComplatedTestsBySubjectId(courseId))
      .then((data) => setComplatedTests(data));
  }, [courseId]);

  return (
    <div className="course-tests__list">
      <h2 className="tests-title">Тесты</h2>
      {tests?.map((test) => (
        <TestItem
          key={test.id}
          test={test}
          complatedTest={complatedTests?.find(
            (item) => item.test_id === test.id
          )}
        />
      ))}
    </div>
  );
};

export default TestsList;
