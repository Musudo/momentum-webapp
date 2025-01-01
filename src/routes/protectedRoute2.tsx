import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = () => {
  // const isAuthenticated = useAuth();

  // if (isAuthenticated) return <Outlet />;

  return <Navigate to="/signin" />;
};

export default ProtectedRoute;
