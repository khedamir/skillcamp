import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CustomCheckbox from "../customCheckbox";
import Button from "../button";
import { adminService } from "../../services/admin.service";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { setCourseData, setThemeData } from "../../redux/admin/slice";

interface FormValues {
  title: string;
  description: string;
  image: FileList;
  iscertificated: boolean;
}

const CourseInfoForm = () => {
  const dispatch = useAppDispatch();
  const { data, onEditing } = useSelector(
    (state: RootState) => state.admin.courseInfo
  );

  const themeInfo = useSelector((state: RootState) => state.admin.themeInfo);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: data.title,
      description: data.description,
      iscertificated: data.iscertificated,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    if (!data.image || data.image.length === 0) {
      alert("Пожалуйста, загрузите изображение");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image[0]);
    formData.append("iscertificated", String(data.iscertificated));

    try {
      setIsLoading(true);
      let result;
      if (onEditing) {
        formData.append("subject_id", String(themeInfo.data.subject_id));
        result = await adminService.updateSubject(formData);
      } else {
        result = await adminService.createSubject(formData);
      }

      dispatch(
        setCourseData({
          data: {
            savedImage: "",
            image: data.image,
            title: data.title,
            description: data.description,
            iscertificated: data.iscertificated,
          },
        })
      );

      dispatch(
        setThemeData({
          data: {
            subject_id: result.subject_id,
            title: "",
            description: "",
          },
        })
      );

      alert("Курс успешно сохранён");
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      alert("Ошибка при сохранении курса");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="course-data__form course-data__wrapper">
      <h3>Информация о курсе</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input"
          type="text"
          placeholder="Название курса"
          {...register("title", { required: "Введите название курса" })}
        />
        {errors.title && <p className="error">{errors.title.message}</p>}

        <input
          className="input"
          type="text"
          placeholder="Описание курса"
          {...register("description", { required: "Введите описание курса" })}
        />
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}

        <span className="course-poster__wrapper">
          <input
            id="course-poster"
            type="file"
            accept="image/*"
            {...register("image", { required: "Загрузите изображение" })}
          />
          <label htmlFor="course-poster">Загрузить постер курса</label>
        </span>
        {errors.image && <p className="error">{errors.image.message}</p>}

        <span>
          <Controller
            name="iscertificated"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <CustomCheckbox
                id="my-checkbox"
                checked={field.value}
                onChange={field.onChange}
                label="Курс завершен"
              />
            )}
          />
        </span>

        <Button otherClass="save-button" type="submit" disabled={isLoading}>
          {isLoading ? "Сохранение..." : "Сохранить"}
        </Button>
      </form>
    </div>
  );
};

export default CourseInfoForm;
