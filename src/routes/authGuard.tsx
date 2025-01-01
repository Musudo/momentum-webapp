import { Navigate } from "react-router-dom";

type TAuthGuardProps = {
  children: JSX.Element;
};

const AuthGuard = ({ children }: TAuthGuardProps) => {
  const isAuthenticated = Boolean(sessionStorage.getItem("authToken"));
  return isAuthenticated ? children : <Navigate to="/signIn" />;
};

export default AuthGuard;
