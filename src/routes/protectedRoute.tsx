import {Navigate} from "react-router-dom";
import {AuthProvider} from "../utils/auth/authProvider.ts";
import {ReactElement} from "react";

type TAuthGuardProps = {
    children: ReactElement;
};

const ProtectedRoute = ({children}: TAuthGuardProps) => {
    const isAuthenticated = AuthProvider.isAuthenticated;
    return isAuthenticated ? children : <Navigate to="/signIn"/>;
};

export default ProtectedRoute;