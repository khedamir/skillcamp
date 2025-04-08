import { FC } from "react";
import { AnswerData } from "../../redux/types";
import { formatDateDifference } from "../../utils/formatDate";

interface AnswerProps {
  answer: AnswerData;
}

const Answer: FC<AnswerProps> = ({ answer }) => {
  return (
    <div className="comment comment-answer">
      <div className="comment-wrapper">
        <div className="user-icon">{answer.email[0]}</div>
        <div className="comment-data">
          <header className="comment-header">
            <p className="comment-author">{answer.email}</p>
            <p className="comment-date">
              {formatDateDifference(answer.created_at)}
            </p>
          </header>
          <p>{answer.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Answer;
