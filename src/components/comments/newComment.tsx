import { FC, useEffect, useState } from "react";
import EmojiBlock from "./emojiBlock";
import { CommentData } from "../../redux/types";
import { commentService } from "../../services/comment.service";

interface NewCommentProps {
  replyComment: CommentData | null;
  setReplyComment: (data: CommentData | null) => void;
  updateComments: () => void;
  lessonId: number;
}

const NewComment: FC<NewCommentProps> = ({
  replyComment,
  setReplyComment,
  lessonId,
  updateComments,
}) => {
  const [value, setValue] = useState("");
  const [inputActive, setInputActive] = useState(false);

  const cancelClick = () => {
    setReplyComment(null);
    setInputActive(false);
    setValue("");
  };

  const AddNewComment = async () => {
    if (replyComment) {
      await commentService.addAnswer({
        content: value,
        comment_id: replyComment.id,
      });
    } else {
      await commentService.addComment({ content: value, theme_id: lessonId });
    }

    updateComments();
    setReplyComment(null);
    setInputActive(false);
    setValue("");
  };

  useEffect(() => {
    if (replyComment) {
      setInputActive(true);
    }
  }, [replyComment]);

  return (
    <div className={`new-comment ${inputActive && "is--active"}`}>
      <div className="new-comment__input">
        {replyComment && (
          <span className="reply-comm">@{replyComment.email}</span>
        )}
        <textarea
          className="input"
          placeholder="Введите комментарий"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClick={() => setInputActive(true)}
        ></textarea>
      </div>
      <div className="new-comment__bottom">
        <EmojiBlock text={value} setText={setValue} />
        <div className="buttons">
          <button onClick={cancelClick} className="button button-cancel">
            Отмена
          </button>
          <button onClick={AddNewComment} className="button">
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewComment;
