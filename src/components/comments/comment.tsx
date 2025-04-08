import { FC, useEffect, useState } from "react";
import { AnswerData, CommentData } from "../../redux/types";
import { commentService } from "../../services/comment.service";
import Answer from "./answer";
import { formatDateDifference } from "../../utils/formatDate";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface CommentProps {
  comment: CommentData;
  setReplyComment: (data: CommentData) => void;
  updateComments: () => void;
}

const Comment: FC<CommentProps> = ({
  comment,
  setReplyComment,
  updateComments,
}) => {
  const [answers, setAnswers] = useState<AnswerData[]>([]);
  const { autharizationData } = useSelector((state: RootState) => state.auth);

  const deleteComment = () => {
    commentService.deleteComment(comment.id).then(() => {
      updateComments();
    });
  };

  useEffect(() => {
    commentService.getAnswers(comment.id).then((data) => {
      if (data) {
        setAnswers(data);
      }
    });
  }, [comment.id]);

  return (
    <div className="comment comment-question">
      <div className="comment-wrapper">
        <div className="user-icon">{comment.email[0]}</div>
        <div className="comment-data">
          <header className="comment-header">
            <p className="comment-author">{comment.email}</p>
            <p className="comment-date">
              {formatDateDifference(comment.created_at)}
            </p>
          </header>
          <p>{comment.content}</p>
        </div>
      </div>
      {autharizationData?.user_role === "admin" && (
        <div className="admin-buttons">
          <span onClick={() => setReplyComment(comment)}>Ответить</span>
          <span onClick={deleteComment}>Удалить</span>
        </div>
      )}

      {answers.length > 0 && (
        <div className="answers-list">
          {answers.map((answer) => (
            <Answer key={answer.id} answer={answer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
