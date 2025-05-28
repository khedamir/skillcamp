import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseInfoType, LessonInfoType, ThemeInfoType } from "./types";

interface AdminState {
  courseInfo: {
    data: CourseInfoType;
    isSaved: boolean;
    onEditing: boolean;
  };
  themeInfo: {
    data: ThemeInfoType;
    isSaved: boolean;
    onEditing: boolean;
  };
  lessonInfo: {
    data: LessonInfoType;
    isSaved: boolean;
    onEditing: boolean;
  };
}

const initialState: AdminState = {
  courseInfo: {
    data: {
      title: "",
      description: "",
      image: null,
      savedImage: "",
      iscertificated: false,
    },
    isSaved: false,
    onEditing: false,
  },
  themeInfo: {
    data: {
      title: "",
      description: "",
      subject_id: null,
    },
    isSaved: false,
    onEditing: false,
  },
  lessonInfo: {
    data: {
      theme_id: null,
      theme_html: "",
    },
    isSaved: false,
    onEditing: false,
  },
};

export const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    setCourseData(
      state,
      action: PayloadAction<{ data: CourseInfoType; onEditing?: boolean }>
    ) {
      state.courseInfo.data = action.payload.data;
      state.courseInfo.isSaved = true;
      if (action.payload.onEditing) {
        state.courseInfo.onEditing = action.payload.onEditing;
      }
    },
    setThemeData(
      state,
      action: PayloadAction<{ data: ThemeInfoType; onEditing?: boolean }>
    ) {
      state.themeInfo.data = action.payload.data;
      state.themeInfo.isSaved = true;
      if (action.payload.onEditing) {
        state.themeInfo.onEditing = action.payload.onEditing;
      }
    },
    setLessonData(
      state,
      action: PayloadAction<{ data: LessonInfoType; onEditing?: boolean }>
    ) {
      state.lessonInfo.data = action.payload.data;
      state.lessonInfo.isSaved = true;
      if (action.payload.onEditing) {
        state.lessonInfo.onEditing = action.payload.onEditing;
      }
    },
    setInitialData(state) {
      state.courseInfo = initialState.courseInfo;
      state.themeInfo = initialState.themeInfo;
      state.lessonInfo = initialState.lessonInfo;
    },
  },
});

export const { setCourseData, setThemeData, setLessonData, setInitialData } =
  adminSlice.actions;
export default adminSlice.reducer;
