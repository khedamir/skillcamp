import { FC, useCallback, useEffect, useState } from "react";
import getCommentCountWord from "../../utils/getCommentCountWord";
import NewComment from "./newComment";
import { CommentData } from "../../redux/types";
import { commentService } from "../../services/comment.service";
import Comment from "./comment";
import Loader from "../loader";

interface CommentsProps {
  lessonId: number;
}

const Comments: FC<CommentsProps> = ({ lessonId }) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [replyComment, setReplyComment] = useState<CommentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateComments = useCallback(() => {
    commentService.getComments(lessonId).then((data) => {
      setComments(data);
      setIsLoading(false);
    });
  }, [lessonId]);

  useEffect(() => {
    updateComments();
  }, [updateComments]);

  return (
    <div className="lesson-comments">
      <header className="lesson-comments__header">
        <h3 className="lesson-comments__title">
          {getCommentCountWord(comments.length)}
        </h3>
      </header>
      <div className="lesson-comments__block">
        <NewComment
          replyComment={replyComment}
          setReplyComment={setReplyComment}
          lessonId={lessonId}
          updateComments={updateComments}
        />
      </div>
      <div className="lesson-comments__list">
        {isLoading ? (
          <Loader />
        ) : (
          comments.map((comment) => (
            <Comment
              key={comment.id + String(new Date())}
              comment={comment}
              setReplyComment={setReplyComment}
              updateComments={updateComments}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
