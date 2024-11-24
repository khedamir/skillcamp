import { createBrowserRouter } from "react-router-dom";
import Admin from "../admin";
import Course from "../course";
import Courses from "../courses";
import HomePage from "../homePage";
import LeaderBoard from "../leaderBoard";
import Lesson from "../lesson";
import Login from "../login";
import Signin from "../signin";
import { AppRoutes } from "./routes";

export const router = createBrowserRouter([
  {
    path: AppRoutes.Home,
    element: <HomePage />,
  },
  {
    path: AppRoutes.Login,
    element: <Login />,
  },
  {
    path: AppRoutes.Signin,
    element: <Signin />,
  },
  {
    path: AppRoutes.Courses,
    element: <Courses />,
  },
  {
    path: AppRoutes.Course,
    element: <Course />,
  },
  {
    path: AppRoutes.Lesson,
    element: <Lesson />,
  },
  {
    path: AppRoutes.LeaderBoard,
    element: <LeaderBoard />,
  },
  {
    path: AppRoutes.Admin,
    element: <Admin />,
  },
]);
