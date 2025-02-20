import {Navigate} from "react-router-dom";
import {AuthProvider} from "../utils/auth/authProvider.ts";

type TAuthGuardProps = {
    children: JSX.Element;
};

const ProtectedRoute = ({children}: TAuthGuardProps) => {
    const isAuthenticated = AuthProvider.isAuthenticated;
    return isAuthenticated ? children : <Navigate to="/signIn"/>;
};

export default ProtectedRoute;