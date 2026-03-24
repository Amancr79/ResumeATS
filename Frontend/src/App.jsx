import { RouterProvider } from "react-router-dom";
import { router } from "./app.route.jsx";
import { AuthProvider } from "./feature/auth/context/Auth.provider.jsx";
import {InterviewProvider} from "./feature/auth/context/Interview.provider.jsx"

export const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  );
};
