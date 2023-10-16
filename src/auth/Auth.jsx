import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Auth = ({ children }) => {
  if (useSelector((state) => state.auth.isAuthenticated)) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default Auth;
