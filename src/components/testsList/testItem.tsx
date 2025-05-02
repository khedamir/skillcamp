import { FC } from "react";
import { ComplatedTestData, TestData } from "../../redux/types";
import { calculateSuccessRate } from "../../utils/calculateSuccessRate";
import { useNavigate, useParams } from "react-router-dom";

interface TestItemProps {
  test: TestData;
  complatedTest: ComplatedTestData | undefined;
}

const TestItem: FC<TestItemProps> = ({ test, complatedTest }) => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const testItemClick = () => {
    navigate(`/tests/${courseId}/${test.id}`);
  };

  return (
    <div
      onClick={testItemClick}
      className={`test-item ${complatedTest && "is--active"}`}
    >
      <p>{test.title}</p>
      {complatedTest && (
        <p>
          {calculateSuccessRate(
            complatedTest.question_count,
            complatedTest.points
          )}
          %
        </p>
      )}
    </div>
  );
};

export default TestItem;
