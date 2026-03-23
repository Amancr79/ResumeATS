import { useAuth } from "../hook/auth.hook";

import { Navigate } from "react-router";

export const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main>
        <h1>Loading ......</h1>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
