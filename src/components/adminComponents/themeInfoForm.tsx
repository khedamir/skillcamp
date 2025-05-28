import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../button";
import { adminService } from "../../services/admin.service";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { setLessonData, setThemeData } from "../../redux/admin/slice";

interface FormValues {
  title: string;
  description: string;
}

const ThemeInfoForm = () => {
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.admin.themeInfo);
  const { isSaved } = useSelector((state: RootState) => state.admin.courseInfo);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: data.title,
      description: data.description,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (themeData: FormValues) => {
    if (!data.subject_id) {
      alert("Ошибка: отсутствует ID курса");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("title", themeData.title);
      formData.append("subject_id", String(data.subject_id));
      formData.append("description", themeData.description);

      const result = await adminService.createTheme(formData);
      dispatch(
        setThemeData({
          data: {
            subject_id: data.subject_id,
            title: themeData.title,
            description: themeData.description,
          },
        })
      );

      dispatch(
        setLessonData({
          data: {
            theme_id: result.theme_id,
            theme_html: "",
          },
        })
      );

      alert("Урок успешно сохранён");
      reset();
    } catch (error) {
      console.error("Ошибка при сохранении урока:", error);
      alert("Не удалось сохранить урок");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-course__data">
      <p>Описание урока</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input"
          type="text"
          placeholder="Название урока"
          {...register("title", { required: "Введите название урока" })}
        />
        {errors.title && <p className="error">{errors.title.message}</p>}

        <input
          className="input"
          type="text"
          placeholder="Описание урока"
          {...register("description", { required: "Введите описание урока" })}
        />
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}

        {!isSaved && (
          <p className="error">Сначала сохраните курс, чтобы добавить уроки.</p>
        )}

        <Button
          otherClass="save-button"
          type="submit"
          disabled={!isSaved || isSubmitting}
        >
          {isSubmitting ? "Сохранение..." : "Сохранить"}
        </Button>
      </form>
    </div>
  );
};

export default ThemeInfoForm;
