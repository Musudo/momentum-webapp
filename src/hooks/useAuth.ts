import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../utils/authProvider";
// import { Authentication } from '@/helpers/auth';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    // Authentication.isAuthenticated,
    AuthProvider.isAuthenticated
  );
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const redirectUrl = await AuthProvider.checkAuthentication(); //Authentication.checkAuthentication();
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
