import { useState } from "react";
import LessonEditor from "../lessonEditor";
import Button from "../button";
import { adminService } from "../../services/admin.service";
import { useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { setLessonData } from "../../redux/admin/slice";

const LessonInfoForm = () => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.admin.lessonInfo);
  const { isSaved } = useSelector((state: RootState) => state.admin.themeInfo);

  const handleSubmit = async () => {
    if (!isSaved) {
      alert("Сначала сохраните тему, прежде чем добавлять содержимое.");
      return;
    }

    if (!content.trim()) {
      alert("Содержимое урока не может быть пустым");
      return;
    }

    const formData = new FormData();
    formData.append("theme_id", String(data.theme_id));
    formData.append("theme_html", content);

    try {
      setIsSubmitting(true);
      await adminService.createLesson(formData);
      dispatch(
        setLessonData({
          data: {
            ...data,
            theme_html: content,
          },
        })
      );
      alert("Содержание урока сохранено");
    } catch (error) {
      console.error("Ошибка при сохранении содержимого урока:", error);
      alert("Не удалось сохранить содержание урока");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-content add-course__data">
      <p>Содержание урока</p>
      <LessonEditor content={content} setContent={setContent} />

      {!isSaved && (
        <p className="error">
          Сначала сохраните тему, чтобы добавить содержимое.
        </p>
      )}

      <Button
        otherClass="save-button"
        onClick={handleSubmit}
        disabled={!isSaved || isSubmitting}
      >
        {isSubmitting ? "Сохранение..." : "Сохранить"}
      </Button>
    </div>
  );
};

export default LessonInfoForm;
