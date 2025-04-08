import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { lessonService } from "../../services/lesson.service";
import { LessonData } from "../../redux/types";
import { profileService } from "../../services/profile.service";
import Comments from "../../components/comments";

const Lesson = () => {
  const [lessonData, setLessonData] = useState<LessonData>();
  const { courseId, lessonId } = useParams();

  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const contentEndRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    lessonService.getLesson(Number(courseId), Number(lessonId)).then((data) => {
      setLessonData(data);
    });
  }, [courseId, lessonId]);

  useEffect(() => {
    if (!contentEndRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setShowCompleteButton(true);
          }, 2000);

          return () => clearTimeout(timer);
        } else {
          setShowCompleteButton(false);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    observer.observe(contentEndRef.current);

    return () => {
      observer.disconnect();
    };
  }, [lessonData]);

  const handleComplete = () => {
    profileService.addPoint(Number(lessonId)).then(() => {
      navigate(`/courses/${courseId}`);
    });
  };

  if (!lessonData) {
    return;
  }

  return (
    <div className="lesson-page page-container">
      <div className="lesson-content-wrapper">
        <h1 className="lesson-title">Основы SQL</h1>
        <LessonContent str={lessonData.upkeep} />
      </div>
      <div ref={contentEndRef} className="complete-button-container">
        {showCompleteButton && (
          <button className="button" onClick={handleComplete}>
            Завершить
          </button>
        )}
      </div>
      <Comments lessonId={lessonData.theme_id} />
    </div>
  );
};

function LessonContent({ str }: { str: string }) {
  return (
    <div className="content" dangerouslySetInnerHTML={createMarkup(str)} />
  );
}

function createMarkup(str: string) {
  return { __html: str };
}

export default Lesson;
