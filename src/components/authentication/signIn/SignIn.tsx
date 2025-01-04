import { Snackbar, SnackbarCloseReason } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slice/userSlice";
import AppTheme from "../../../shared-theme/AppTheme";
import ColorModeSelect from "../../../shared-theme/ColorModeSelect";
import { FacebookIcon, GoogleIcon } from "../../../shared-theme/CustomIcons";
import { SignInCard } from "../signInCard";
import { SignInContainer } from "../signInContainer";
import ForgotPassword from "./ForgotPassword";

const SignIn = (props: { disableCustomTheme?: boolean }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const [email, setEmail] = useState(urlParams.get("email"));
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [resetPasswordModalState, setResetPasswordModalState] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
  });
  const dispatch = useDispatch();

  const validateEmail = (
    value: string,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value.trim() === "") {
      setError(true);
      setErrorMessage("Email is required");
    } else if (!emailRegex.test(value)) {
      setError(true);
      setErrorMessage("Invalid email address");
    } else {
      setError(false);
      setErrorMessage("");
    }
  };

  const validatePassword = (
    value: string,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (value.trim() === "") {
      setError(true);
      setErrorMessage("Password is required");
    } else if (!passwordRegex.test(value)) {
      setError(true);
      setErrorMessage(
        "Password must be at least 6 characters long, contain at least 1 digit, and at least 1 uppercase letter"
      );
    } else {
      setError(false);
      setErrorMessage("");
    }
  };

  const signInMutation = useMutation({
    mutationFn: async (data: object) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    },
    onSuccess: (res) => {
      sessionStorage.setItem("authToken", res["token"]);
      dispatch(setUser(res["user"]));
      window.location.href = "/dashboard";
    },
    onError: (err) => {
      console.log("Error: ", err);
      setSnackbarState({
        ...snackbarState,
        open: true,
        message: "Invalid credentials",
      });
    },
  });

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignInContainer direction="column" justifyContent="space-between">
        <Snackbar
          open={snackbarState.open}
          onClose={(
            event: React.SyntheticEvent | Event,
            reason?: SnackbarCloseReason
          ) => {
            if (reason === "clickaway") {
              return;
            }
            setSnackbarState({ ...snackbarState, open: false });
          }}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          message={snackbarState.message}
        />
        <SignInCard variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                defaultValue={email}
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
                onChange={(event) => {
                  setEmail(event.target.value);
                  validateEmail(
                    event.target.value,
                    setEmailError,
                    setEmailErrorMessage
                  );
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
                onChange={(event) => {
                  setPassword(event.target.value);
                  validatePassword(
                    event.target.value,
                    setPasswordError,
                    setPasswordErrorMessage
                  );
                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword
              open={resetPasswordModalState}
              handleClose={() => setResetPasswordModalState(false)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={() => {
                let hasErrors = false;

                if (emailError || !email) {
                  setEmailError(true);
                  setEmailErrorMessage("Email is required");
                  hasErrors = true;
                }

                if (passwordError || !password) {
                  setPasswordError(true);
                  setPasswordErrorMessage("Password is required");
                  hasErrors = true;
                }

                if (hasErrors) return;

                signInMutation.mutate({
                  email: email,
                  password: password,
                });
              }}
            >
              Sign in
            </Button>
            <Link
              component="button"
              type="button"
              onClick={() => setResetPasswordModalState(true)}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              disabled
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              disabled
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link href="/signUp" variant="body2" sx={{ alignSelf: "center" }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </SignInCard>
      </SignInContainer>
    </AppTheme>
  );
};

export default SignIn;
