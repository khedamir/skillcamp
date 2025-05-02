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

export interface CommentData {
  id: number;
  theme_id: number;
  user_id: string;
  content: string;
  email: string;
  created_at: string;
}

export interface AnswerData {
  id: number;
  comment_id: number;
  user_id: string;
  content: string;
  email: string;
  created_at: string;
}

export interface TestData {
  id: number;
  subject_id: number;
  title: string;
}

export interface ComplatedTestData {
  id: number;
  points: number;
  question_count: number;
  subject_id: number;
  test_id: number;
  user_id: number;
}

export interface QuestionData {
  id: number;
  options: string;
  question: string;
  subject_id: number;
  test_id: number;
}

export interface TestAnswerData {
  question_id: number;
  answer: string;
}

export type UserRoles = "admin" | "user";
