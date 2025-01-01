// import { Authentication } from "@/helpers/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignInCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      let redirectRoute = "/";
      // if (!Authentication.isAuthenticated) {
      //   const url = new URL(window.location.href);
      //   const { previousPathname } = JSON.parse(
      //     url.searchParams.get("state") ?? "{}"
      //   );
      //   await Authentication.validateSignin(url.searchParams.get("code"));
      //   if (previousPathname)
      //     redirectRoute = new URL(previousPathname).pathname;
      // }
      navigate(redirectRoute, { replace: true });
    };

    handleCallback();
  }, [navigate]);

  return <></>;
};

export default SignInCallback;
