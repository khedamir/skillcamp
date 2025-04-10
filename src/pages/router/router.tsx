import { createBrowserRouter } from "react-router-dom";
import Admin from "../admin";
import Course from "../course";
import Courses from "../courses";
import HomePage from "../homePage";
import LeaderBoard from "../leaderBoard";
import Lesson from "../lesson";
import Sigin from "../signin";
import Signup from "../signup";
import { AppRoutes } from "./routes";
import BaseLayout from "../../layouts/baseLayout";
import Profile from "../profile";

export const router = createBrowserRouter([
  {
    path: AppRoutes.Home,
    element: <HomePage />,
  },
  {
    path: AppRoutes.Sigin,
    element: <Sigin />,
  },
  {
    path: AppRoutes.Signup,
    element: <Signup />,
  },
  {
    path: AppRoutes.Courses,
    element: (
      <BaseLayout>
        <Courses />
      </BaseLayout>
    ),
  },
  {
    path: AppRoutes.Course,
    element: (
      <BaseLayout>
        <Course />
      </BaseLayout>
    ),
  },
  {
    path: AppRoutes.Lesson,
    element: (
      <BaseLayout>
        <Lesson />
      </BaseLayout>
    ),
  },
  {
    path: AppRoutes.LeaderBoard,
    element: (
      <BaseLayout>
        <LeaderBoard />
      </BaseLayout>
    ),
  },
  {
    path: AppRoutes.Profile,
    element: (
      <BaseLayout>
        <Profile />
      </BaseLayout>
    ),
  },
  {
    path: AppRoutes.Admin,
    element: (
      <BaseLayout>
        <Admin />
      </BaseLayout>
    ),
  },
]);
