export interface CourseInfoType {
  title: string;
  description: string;
  savedImage: string;
  image: FileList | null;
  iscertificated: boolean;
}

export interface ThemeInfoType {
  title: string;
  description: string;
  subject_id: number | null;
}

export interface LessonInfoType {
  theme_id: number | null;
  theme_html: string;
}
