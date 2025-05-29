import { useEffect, useState } from "react";
import { QuestionData, TestAnswerData } from "../../redux/types";
import { testService } from "../../services/test.service";
import { useParams } from "react-router-dom";
import TestQuestion from "../../components/testQuestion";
import Button from "../../components/button";
import TestResultModal from "../../components/testResultModal";
import Loader from "../../components/loader";

const Test = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [answers, setAnswers] = useState<TestAnswerData[]>([]);
  const { testId, courseId } = useParams();
  const [modalActive, setModalActive] = useState(false);

  const [points, setPoints] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    testService
      .getQuestions(Number(testId))
      .then((data) => setQuestions(data))
      .then(() => setIsLoading(false));
  }, [testId]);

  const setValueForQuestion = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: number
  ) => {
    const newAnswer = {
      question_id: questionId,
      answer: e.target.value,
    };

    setAnswers((prevAnswers) => {
      const filtered = prevAnswers.filter((a) => a.question_id !== questionId);
      return [...filtered, newAnswer];
    });
  };

  const SubmitQueston = async (e: React.FormEvent) => {
    e.preventDefault();

    if (answers?.length < questions?.length) {
      alert("Пожалуйста, ответьте на все вопросы!");
      return;
    }

    try {
      const data = await testService.checkAnswers(
        Number(testId),
        Number(courseId),
        answers
      );
      setPoints(data.points);
      setModalActive(true);
    } catch (error) {
      console.error("Ошибка при отправке ответов:", error);
      alert("Произошла ошибка при отправке ответов");
    }
  };

  return (
    <div className="test-page page-container">
      <h1 className="test-page__title">Тестирование</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={SubmitQueston}>
          <div className="test-page__questions">
            {questions?.map((data, i) => (
              <TestQuestion
                key={data.id}
                data={data}
                index={i}
                setValueForQuestion={setValueForQuestion}
              />
            ))}
          </div>
          <Button type="submit">Готово</Button>
        </form>
      )}
      <TestResultModal
        active={modalActive}
        setActive={setModalActive}
        points={points}
        quantity={questions?.length}
      />
    </div>
  );
};

export default Test;
