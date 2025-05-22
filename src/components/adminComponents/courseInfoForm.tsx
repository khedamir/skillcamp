import { useState } from "react";
import CustomCheckbox from "../customCheckbox";
import Button from "../button";

const CourseInfoForm = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="course-data__form course-data__wrapper">
      <h3>Информация о курсе</h3>
      <form action="">
        <input className="input" type="text" placeholder="Название курса" />
        <input className="input" type="text" placeholder="Описание курса" />
        <span className="course-poster__wrapper">
          <input id="course-poster" type="file" />
          <label htmlFor="course-poster">Загрузить постер курса</label>
        </span>
        <span>
          <CustomCheckbox
            id="my-checkbox"
            checked={checked}
            onChange={setChecked}
            label="По окончанию курса выдается сертификат"
          />
        </span>
        <Button otherClass="save-button">Сохранить</Button>
      </form>
    </div>
  );
};

export default CourseInfoForm;
