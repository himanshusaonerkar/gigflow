// ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default ({ children }) =>
  useSelector(s => s.auth.user) ? children : <Navigate to="/login" />;
