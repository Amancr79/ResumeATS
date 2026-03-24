import { createBrowserRouter } from "react-router";
import Login from "./feature/auth/pages/Login";
import Register from "./feature/auth/pages/Register";
import { Homepage } from "./feature/auth/pages/Homepage";
import { Protected } from "./feature/auth/components/protected";
import Report from "./feature/auth/pages/Report";

export const router = createBrowserRouter([
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Register />,
    path: "/register",
  },
  {
    element: (
      <Protected>
        <Homepage />
      </Protected>
    ),
    path: "/homepage",
  },
  {
    element: (
      <Protected>
        <Report />
      </Protected>
    ),
    path: "/report/:id",
  },
]);
