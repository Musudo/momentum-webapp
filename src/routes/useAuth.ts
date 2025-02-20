import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {AuthProvider} from "../utils/auth/authProvider.ts";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const redirectUrl = AuthProvider.checkAuthentication();
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [navigate]);

  return isAuthenticated;
};
