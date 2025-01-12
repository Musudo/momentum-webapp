import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  // Authentication.isAuthenticated,
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const redirectUrl = "/dashboard"; //await Authentication.checkAuthentication();
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
