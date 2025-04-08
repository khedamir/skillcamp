import { FC } from "react";
import { ComplatedTestData, TestData } from "../../redux/types";
import { calculateSuccessRate } from "../../utils/calculateSuccessRate";

interface TestItemProps {
  test: TestData;
  complatedTest: ComplatedTestData | undefined;
}

const TestItem: FC<TestItemProps> = ({ test, complatedTest }) => {
  return (
    <div className="test-item">
      <p>{test.title}</p>
      {complatedTest && (
        <p>
          {calculateSuccessRate(
            complatedTest.question_count,
            complatedTest.points
          )}
        </p>
      )}
    </div>
  );
};

export default TestItem;
