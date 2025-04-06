import {useEffect} from "react";
import {useLocation} from "react-router-dom";

export const useDynamicTitle = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        let pageTitle = "Momentum Showcase";

        if (path.includes("/dashboard") || path === "/") pageTitle = `${pageTitle} - Dashboard`;
        else if (path.includes("/activities")) pageTitle = `${pageTitle} - Activities`;
        else if (path.includes("/contacts")) pageTitle = `${pageTitle} - Contacts`;
        else if (path.includes("/profile")) pageTitle = `${pageTitle} - Profile`;
        else if (path.includes("/signIn")) pageTitle = `${pageTitle} - Sign In`;
        else if (path.includes("/signUp")) pageTitle = `${pageTitle} - Sign Up`;

        document.title = pageTitle;
    }, [location.pathname]);
};
