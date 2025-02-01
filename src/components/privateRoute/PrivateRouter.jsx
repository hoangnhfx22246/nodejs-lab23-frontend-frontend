import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRouter({ children }) {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return children;
}
