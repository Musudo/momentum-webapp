import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {AuthProvider} from "../utils/auth/authProvider.ts";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthProvider.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const redirectUrl = AuthProvider.checkAuthentication();
      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [navigate]);

  return isAuthenticated;
};
