import { QuestionData } from "../../redux/types";
import { FaCheck } from "react-icons/fa";

interface TestQuestionProps {
  data: QuestionData;
  index: number;
  setValueForQuestion: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
}

const TestQuestion: React.FC<TestQuestionProps> = ({
  data,
  index,
  setValueForQuestion,
}) => {
  return (
    <div className="question_item">
      <h3>{index + 1 + ". " + data.question}</h3>
      {data.options.split(";").map((option, i) => (
        <div className="question_option" key={i}>
          <label htmlFor={data.question + i}>
            <input
              onChange={(e) => setValueForQuestion(e, data.id)}
              type="radio"
              name={data.question}
              value={option}
              id={data.question + i}
            />
            <span className="radio-button">
              <FaCheck />
            </span>
            <span>{option}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default TestQuestion;
