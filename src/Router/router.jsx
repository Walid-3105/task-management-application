import AddTask from "@/Pages/AddTask";
import Banner from "@/Pages/Banner";
import Main from "@/Pages/Main";
import { SignIn } from "@/Pages/SignIn";
import Tasks from "@/Pages/Tasks";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Banner />,
      },
      {
        path: "tasks",
        element: (
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        ),
      },
      {
        path: "addTask",
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/signIn",
    element: <SignIn></SignIn>,
  },
]);
