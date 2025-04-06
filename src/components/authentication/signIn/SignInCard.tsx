import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ForgotPassword from './ForgotPassword';
import {FacebookIcon, GoogleIcon} from './CustomIcons';
import {CardContainer} from "../../cardContainer.tsx";
import {useDispatch} from "react-redux";
import {AuthProvider} from "../../../utils/auth/authProvider.ts";
import {setUser} from "../../../redux/slice/userSlice.ts";
import {Snackbar, SnackbarCloseReason} from "@mui/material";
import {z} from 'zod';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {useTheme} from "@mui/material/styles";
import {useNavigate, useSearchParams} from 'react-router-dom';

const signInSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .nonempty("Password is required")
        .regex(
            /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
            "Password must be at least: 6 characters long, contain 1 digit, 1 uppercase letter, and no special characters"
        ),
});

const SignInCard = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const [email, setEmail] = useState(urlParams.get("email") || "");
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const [resetPasswordModalState, setResetPasswordModalState] = useState(false);
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
    });
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const returnUrl = searchParams.get("returnUrl") || "/dashboard";

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        const result = signInSchema.pick({email: true}).safeParse({email: newEmail});
        if (!result.success) {
            setEmailError(true);
            setEmailErrorMessage(result.error.errors[0].message);
        } else {
            setEmailError(false);
            setEmailErrorMessage("");
        }
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        const result = signInSchema.pick({password: true}).safeParse({password: newPassword});
        if (!result.success) {
            setPasswordError(true);
            setPasswordErrorMessage(result.error.errors[0].message);
        } else {
            setPasswordError(false);
            setPasswordErrorMessage("");
        }
    };

    const handleSignIn = async () => {
        // Validate form values using the complete Zod schema on submit
        const result = signInSchema.safeParse({email, password});
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            if (fieldErrors.email) {
                setEmailError(true);
                setEmailErrorMessage(fieldErrors.email.join(", "));
            }
            if (fieldErrors.password) {
                setPasswordError(true);
                setPasswordErrorMessage(fieldErrors.password.join(", "));
            }
            return;
        }

        try {
            const user = await AuthProvider.signIn({
                username: email,
                password: password,
            });
            dispatch(setUser(user));
            navigate(returnUrl || "/dashboard");
        } catch {
            setSnackbarState({
                ...snackbarState,
                open: true,
                message: "Invalid credentials",
            });
        }
    };

    return (
        <CardContainer variant="outlined"
                       customStyles={{
                           [theme.breakpoints.up('sm')]: {
                               width: '450px',
                           },
                       }}>
            <Snackbar
                open={snackbarState.open}
                onClose={(
                    _event: React.SyntheticEvent<any> | Event,
                    reason?: SnackbarCloseReason
                ) => {
                    if (reason === "clickaway") {
                        return;
                    }
                    setSnackbarState({...snackbarState, open: false});
                }}
                autoHideDuration={2000}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                message={snackbarState.message}
            />
            <Typography
                component="h1"
                variant="h4"
                sx={{width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)"}}
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
                        value={email}
                        placeholder="your@email.com"
                        autoComplete="email"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={emailError ? "error" : "primary"}
                        onChange={handleEmailChange}
                    />
                </FormControl>
                <FormControl>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                            component="button"
                            type="button"
                            onClick={() => setResetPasswordModalState(true)}
                            variant="body2"
                            sx={{alignSelf: "baseline"}}
                        >
                            Forgot your password?
                        </Link>
                    </Box>
                    <TextField
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        name="password"
                        placeholder="••••••"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        required
                        fullWidth
                        variant="outlined"
                        color={passwordError ? "error" : "primary"}
                        onChange={handlePasswordChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSignIn();
                            }
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                </FormControl>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
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
                    onClick={handleSignIn}
                >
                    Sign in
                </Button>
                <Typography sx={{textAlign: "center"}}>
                    Don&apos;t have an account?{" "}
                    <span>
                        <Link
                            href="/signUp"
                            variant="body2"
                            sx={{alignSelf: "center"}}
                        >
                          Sign up
                        </Link>
                    </span>
                </Typography>
            </Box>
            <Divider>or</Divider>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <Button
                    disabled
                    fullWidth
                    variant="outlined"
                    onClick={() => alert("Sign in with Google")}
                    startIcon={<GoogleIcon/>}
                >
                    Sign in with Google
                </Button>
                <Button
                    disabled
                    fullWidth
                    variant="outlined"
                    onClick={() => alert("Sign in with Facebook")}
                    startIcon={<FacebookIcon/>}
                >
                    Sign in with Facebook
                </Button>
            </Box>
        </CardContainer>
    );
};

export default SignInCard;
