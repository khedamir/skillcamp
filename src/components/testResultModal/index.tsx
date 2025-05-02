import { FC } from "react";
import Modal from "../modal";
import { calculateSuccessRate } from "../../utils/calculateSuccessRate";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../button";

interface TestResultModalProps {
  active: boolean;
  setActive: (active: boolean) => void;
  points: number;
  quantity: number;
}

const TestResultModal: FC<TestResultModalProps> = ({
  active,
  setActive,
  points,
  quantity,
}) => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const onClose = (value: boolean) => {
    setActive(value);
    navigate(`/courses/${courseId}`);
  };

  return (
    <Modal title={"Результат теста"} active={active} setActive={onClose}>
      <div className="test-result-modal">
        <div className="test-result-modal__description">
          Ваш результат: <span>{calculateSuccessRate(quantity, points)} </span>
          из 100
        </div>
        <Button onClick={() => onClose(false)}>Закрыть</Button>
      </div>
    </Modal>
  );
};

export default TestResultModal;
