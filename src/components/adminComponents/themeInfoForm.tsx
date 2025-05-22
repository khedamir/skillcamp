import Button from "../button";

const ThemeInfoForm = () => {
  return (
    <div className="add-course__data">
      <p>Описание урока</p>
      <form action="">
        <input className="input" type="text" placeholder="Название урока" />
        <input className="input" type="text" placeholder="Описание урока" />
        <Button otherClass="save-button">Сохранить</Button>
      </form>
    </div>
  );
};

export default ThemeInfoForm;
