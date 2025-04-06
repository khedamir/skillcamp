export interface UserInfo {
  create_date: string;
  email: string;
  id: string;
  role: UserRoles;
}

export interface ProfileData {
  description: string;
  full_name: string;
  id: number;
  image: string;
  phone: string;
  score: number;
  user_id: string;
}

export interface LeaderBoardUserData {
  id: number;
  image: string;
  score: number;
  username: string;
}

export interface AutharizationInfo {
  user_id: string;
  user_role: UserRoles;
}

export interface CourseData {
  id: number;
  image: string;
  title: string;
  description: string;
  iscertificated: string;
}

export interface ThemeData {
  id: number;
  description: string;
  subject_id: number;
  title: string;
}

export interface LessonData {
  id: number;
  theme_id: number;
  upkeep: string;
}

export type UserRoles = "admin" | "user";
