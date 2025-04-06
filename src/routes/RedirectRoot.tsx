import {Navigate} from "react-router-dom";
import {AuthProvider} from "../utils/auth/authProvider.ts";

const RedirectRoot = () => {
    const isAuthenticated = AuthProvider.isAuthenticated;
    return <Navigate to={isAuthenticated ? "/dashboard" : "/signIn"}/>;
};

export default RedirectRoot;
