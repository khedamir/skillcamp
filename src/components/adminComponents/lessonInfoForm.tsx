import { useState } from "react";
import LessonEditor from "../lessonEditor";
import Button from "../button";

const LessonInfoForm = () => {
  const [content, setContent] = useState("");
  return (
    <div className="add-content add-course__data">
      <p>Содержание урока</p>
      <LessonEditor content={content} setContent={setContent} />
      <Button otherClass="save-button">Сохранить</Button>
    </div>
  );
};

export default LessonInfoForm;
