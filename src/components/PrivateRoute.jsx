import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (requiredRole && loggedInUser.role !== requiredRole) {
    // Role does not match — redirect users to their profile
    return <Navigate to="/profile" />;
  }

  // Authorized
  return children;
};

export default PrivateRoute;
