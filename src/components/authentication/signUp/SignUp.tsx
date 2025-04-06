import * as React from "react";
import {useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {FacebookIcon, GoogleIcon} from "../../../theme/CustomIcons";
import {CardContainer} from "../../cardContainer.tsx";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {Snackbar, SnackbarCloseReason} from "@mui/material";
import {z} from "zod";
import {useTheme} from "@mui/material/styles";

// Base schema without cross-field refinement for individual field validations
const baseSignUpSchema = z.object({
    firstName: z
        .string()
        .nonempty("First name is required")
        .regex(/^[a-zA-Z]+$/, "First name can only contain letters"),
    lastName: z
        .string()
        .nonempty("Last name is required")
        .regex(/^[a-zA-Z]+$/, "Last name can only contain letters"),
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    password: z
        .string()
        .nonempty("Password is required")
        .regex(
            /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
            "Password must be at least: 6 characters long, contain 1 digit, 1 uppercase letter, and no special characters"
        ),
    repeatPassword: z.string().nonempty("Repeat password is required"),
});

// Full schema with refinement for form submission
const signUpSchema = baseSignUpSchema.refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
});

const SignUp = () => {
    const theme = useTheme();
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);
    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");

    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState(false);
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const [repeatPassword, setRepeatPassword] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);
    const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] = useState("");

    const [showFirstPassword, setShowFirstPassword] = useState(false);
    const [showSecondPassword, setShowSecondPassword] = useState(false);

    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
    });

    const signUpMutation = useMutation({
        mutationFn: async (data: object) => {
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
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
            setSnackbarState({
                ...snackbarState,
                open: true,
                message: "New user created",
            });
            setTimeout(() => {
                window.location.href = `/signIn?email=${encodeURIComponent(res.email)}`;
            }, 2000);
        },
        onError: () => {
            setSnackbarState({
                ...snackbarState,
                open: true,
                message: "Failed to create new user",
            });
        },
    });

    // Field-level change handlers using the base schema
    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFirstName(value);
        const result = baseSignUpSchema.pick({firstName: true}).safeParse({firstName: value});
        if (!result.success) {
            setFirstNameError(true);
            setFirstNameErrorMessage(result.error.errors[0].message);
        } else {
            setFirstNameError(false);
            setFirstNameErrorMessage("");
        }
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLastName(value);
        const result = baseSignUpSchema.pick({lastName: true}).safeParse({lastName: value});
        if (!result.success) {
            setLastNameError(true);
            setLastNameErrorMessage(result.error.errors[0].message);
        } else {
            setLastNameError(false);
            setLastNameErrorMessage("");
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        const result = baseSignUpSchema.pick({email: true}).safeParse({email: value});
        if (!result.success) {
            setEmailError(true);
            setEmailErrorMessage(result.error.errors[0].message);
        } else {
            setEmailError(false);
            setEmailErrorMessage("");
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        const result = baseSignUpSchema.pick({password: true}).safeParse({password: value});
        if (!result.success) {
            setPasswordError(true);
            setPasswordErrorMessage(result.error.errors[0].message);
        } else {
            setPasswordError(false);
            setPasswordErrorMessage("");
        }
        // Revalidate repeatPassword if it's entered to enforce matching passwords
        if (repeatPassword) {
            const fullResult = signUpSchema.safeParse({
                firstName,
                lastName,
                email,
                password: value,
                repeatPassword,
            });
            if (!fullResult.success) {
                const errors = fullResult.error.flatten().fieldErrors;
                if (errors.repeatPassword) {
                    setRepeatPasswordError(true);
                    setRepeatPasswordErrorMessage(errors.repeatPassword.join(", "));
                } else {
                    setRepeatPasswordError(false);
                    setRepeatPasswordErrorMessage("");
                }
            } else {
                setRepeatPasswordError(false);
                setRepeatPasswordErrorMessage("");
            }
        }
    };

    const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRepeatPassword(value);
        const fullResult = signUpSchema.safeParse({
            firstName,
            lastName,
            email,
            password,
            repeatPassword: value,
        });
        if (!fullResult.success) {
            const errors = fullResult.error.flatten().fieldErrors;
            if (errors.repeatPassword) {
                setRepeatPasswordError(true);
                setRepeatPasswordErrorMessage(errors.repeatPassword.join(", "));
            } else {
                setRepeatPasswordError(false);
                setRepeatPasswordErrorMessage("");
            }
        } else {
            setRepeatPasswordError(false);
            setRepeatPasswordErrorMessage("");
        }
    };

    // Handler for form submission that validates the entire form using the refined schema
    const handleSignUp = () => {
        const result = signUpSchema.safeParse({
            firstName,
            lastName,
            email,
            password,
            repeatPassword,
        });
        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            if (errors.firstName) {
                setFirstNameError(true);
                setFirstNameErrorMessage(errors.firstName.join(", "));
            }
            if (errors.lastName) {
                setLastNameError(true);
                setLastNameErrorMessage(errors.lastName.join(", "));
            }
            if (errors.email) {
                setEmailError(true);
                setEmailErrorMessage(errors.email.join(", "));
            }
            if (errors.password) {
                setPasswordError(true);
                setPasswordErrorMessage(errors.password.join(", "));
            }
            if (errors.repeatPassword) {
                setRepeatPasswordError(true);
                setRepeatPasswordErrorMessage(errors.repeatPassword.join(", "));
            }
            return;
        }
        // If validation passes, trigger the mutation
        signUpMutation.mutate({
            username: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        });
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
                    _event: React.SyntheticEvent | Event,
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
                Sign up
            </Typography>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <FormControl>
                    <FormLabel htmlFor="firstName">First name</FormLabel>
                    <TextField
                        autoComplete="firstName"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        placeholder="Jon"
                        error={firstNameError}
                        helperText={firstNameErrorMessage}
                        color={firstNameError ? "error" : "primary"}
                        onChange={handleFirstNameChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="lastName">Last name</FormLabel>
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
                        onChange={handleLastNameChange}
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
                        color={emailError ? "error" : "primary"}
                        onChange={handleEmailChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        placeholder="••••••"
                        type={showFirstPassword ? "text" : "password"}
                        id="password"
                        autoComplete="new-password"
                        variant="outlined"
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        color={passwordError ? "error" : "primary"}
                        onChange={handlePasswordChange}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowFirstPassword(!showFirstPassword)}
                                            edge="end"
                                        >
                                            {showFirstPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                </FormControl>
                {/[a-zA-Z]/.test(password) && (
                    <FormControl>
                        <FormLabel htmlFor="repeatPassword">Repeat password</FormLabel>
                        <TextField
                            required
                            fullWidth
                            name="repeatPassword"
                            placeholder="••••••"
                            type={showSecondPassword ? "text" : "password"}
                            id="repeatPassword"
                            autoComplete="new-password"
                            variant="outlined"
                            error={repeatPasswordError}
                            helperText={repeatPasswordErrorMessage}
                            color={repeatPasswordError ? "error" : "primary"}
                            onChange={handleRepeatPasswordChange}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowSecondPassword(!showSecondPassword)}
                                                edge="end"
                                            >
                                                {showSecondPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }
                            }}
                        />
                    </FormControl>
                )}
                <Button type="button" fullWidth variant="contained" onClick={handleSignUp}>
                    Sign up
                </Button>
            </Box>
            <Divider>
                <Typography sx={{color: "text.secondary"}}>or</Typography>
            </Divider>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <Button
                    disabled
                    fullWidth
                    variant="outlined"
                    onClick={() => alert("Sign up with Google")}
                    startIcon={<GoogleIcon/>}
                >
                    Sign up with Google
                </Button>
                <Button
                    disabled
                    fullWidth
                    variant="outlined"
                    onClick={() => alert("Sign up with Facebook")}
                    startIcon={<FacebookIcon/>}
                >
                    Sign up with Facebook
                </Button>
                <Typography sx={{textAlign: "center"}}>
                    Already have an account?{" "}
                    <Link href="/signIn" variant="body2" sx={{alignSelf: "center"}}>
                        Sign in
                    </Link>
                </Typography>
            </Box>
        </CardContainer>
    );
};

export default SignUp;
