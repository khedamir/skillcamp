import { FC, useEffect, useState } from "react";
import { ComplatedTestData, TestData } from "../../redux/types";
import { testService } from "../../services/test.service";
import TestItem from "./testItem";
import Loader from "../loader";

interface TestsListProps {
  courseId: number;
}

const TestsList: FC<TestsListProps> = ({ courseId }) => {
  const [tests, setTests] = useState<TestData[]>([]);
  const [complatedTests, setComplatedTests] = useState<
    ComplatedTestData[] | null
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    testService
      .getTestsBySubjectId(courseId)
      .then((data) => setTests(data))
      .then(() => testService.getComplatedTestsBySubjectId(courseId))
      .then((data) => setComplatedTests(data))
      .then(() => setIsLoading(false));
  }, [courseId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="course-tests__list">
      {tests && (
        <>
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
        </>
      )}
    </div>
  );
};

export default TestsList;
