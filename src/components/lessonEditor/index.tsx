import { FC } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// Создаем простой адаптер для Base64 загрузки
function Base64UploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then((file: File) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({ default: reader.result });
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
          });
        });
      },
    };
  };
}

interface LessonEditorProps {
  content: string;
  setContent: (v: string) => void;
}

const LessonEditor: FC<LessonEditorProps> = ({ content, setContent }) => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor as any}
        data={content}
        config={{
          extraPlugins: [Base64UploadAdapterPlugin], // Добавляем наш плагин
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "uploadImage",
            "blockQuote",
            "undo",
            "redo",
          ],
          image: {
            toolbar: [
              "imageTextAlternative", // Альтернативный текст
              "imageStyle:inline", // В строку с текстом
              "imageStyle:block", // Отдельный блок
              "imageStyle:side", // С обтеканием текста
            ],
            // Разрешаем загрузку через Base64 (изображения сохраняются в HTML)
            upload: {
              types: ["jpeg", "png", "gif"], // Разрешенные форматы
            },
          },
        }}
        onReady={(editor) => {
          // Добавляем поддержку вставки из буфера обмена
          editor.editing.view.document.on("clipboardInput", (evt: any, data: any) => {
            if (data.dataTransfer.files.length) {
              editor.execute("uploadImage", {
                file: data.dataTransfer.files[0],
              });
              evt.stop();
            }
          });
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      />
    </div>
  );
};

export default LessonEditor;
