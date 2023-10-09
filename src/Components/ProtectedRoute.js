import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("token")) {
    return children;
  } else Navigate({ to: "/login" });
};
