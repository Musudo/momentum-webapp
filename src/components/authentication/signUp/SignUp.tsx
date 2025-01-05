import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AppTheme from "../../../shared-theme/AppTheme";
import { GoogleIcon, FacebookIcon } from "../../../shared-theme/CustomIcons";
import ColorModeSelect from "../../../shared-theme/ColorModeSelect";
import { SignInContainer } from "../signInContainer";
import { SignInCard } from "../signInCard";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Snackbar, SnackbarCloseReason } from "@mui/material";
import { useState } from "react";
import { fetchUser } from "../../../utils/axios/configs/userAxios";

const SignUp = (props: { disableCustomTheme?: boolean }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
  });

  const validateField = (
    value: string,
    fieldName: string,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (value.trim() === "") {
      setError(true);
      setErrorMessage(`${fieldName} is required`);
    } else if (!/^[a-zA-Z]+$/.test(value)) {
      setError(true);
      setErrorMessage(`${fieldName} can only contain letters`);
    } else {
      setError(false);
      setErrorMessage("");
    }
  };

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

  const signUpMutation = useMutation({
    mutationFn: async (data: object) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/register`,
        data,
        {
          headers: {
            "Content-Type": "application/ld+json",
          },
        }
      );
      return res.data;
    },
    onSuccess: (res) => {
      setSnackbarState({
        ...snackbarState,
        open: true,
        message: "New user created",
      });
      setTimeout(() => {
        window.location.href = `/signIn?email=${encodeURIComponent(res.email)}`;
      }, 2000);
    },
    onError: (err) => {
      console.log("Error: ", err);
      setSnackbarState({
        ...snackbarState,
        open: true,
        message: "Failed to create new user",
      });
    },
  });

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignInContainer direction="column" justifyContent="space-between">
        <SignInCard variant="outlined">
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
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="name">First name</FormLabel>
              <TextField
                autoComplete="First name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                placeholder="Jon"
                error={firstNameError}
                helperText={firstNameErrorMessage}
                color={firstNameError ? "error" : "primary"}
                onChange={(event) => {
                  setFirstName(event.target.value);
                  validateField(
                    event.target.value,
                    "First name",
                    setFirstNameError,
                    setFirstNameErrorMessage
                  );
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="name">Last name</FormLabel>
              <TextField
                autoComplete="lastName"
                name="lastName"
                required
                fullWidth
                id="lastName"
                placeholder="Snow"
                error={lastNameError}
                helperText={lastNameErrorMessage}
                color={lastNameError ? "error" : "primary"}
                onChange={(event) => {
                  setLastName(event.target.value);
                  validateField(
                    event.target.value,
                    "Last name",
                    setLastNameError,
                    setLastNameErrorMessage
                  );
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? "error" : "primary"}
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
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
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
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={() => {
                let hasErrors = false;

                if (firstNameError || !firstName) {
                  setFirstNameError(true);
                  setFirstNameErrorMessage("First name is required");
                  hasErrors = true;
                }

                if (lastNameError || !lastName) {
                  setLastNameError(true);
                  setLastNameErrorMessage("Last name is required");
                  hasErrors = true;
                }

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

                signUpMutation.mutate({
                  email: email,
                  password: password,
                  firstName: firstName,
                  lastName: lastName,
                });
              }}
            >
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              disabled
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Button
              disabled
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link href="/signIn" variant="body2" sx={{ alignSelf: "center" }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </SignInCard>
      </SignInContainer>
    </AppTheme>
  );
};

export default SignUp;
