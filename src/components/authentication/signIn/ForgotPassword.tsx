import * as React from "react";
import {useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import {z} from "zod";

type TForgotPasswordProps = {
    open: boolean;
    handleClose: () => void;
}

const emailSchema = z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address");

const ForgotPassword = ({open, handleClose}: TForgotPasswordProps) => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        const result = emailSchema.safeParse(newEmail);
        if (!result.success) {
            setEmailError(result.error.errors[0].message);
        } else {
            setEmailError("");
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = emailSchema.safeParse(email);
        if (!result.success) {
            setEmailError(result.error.errors[0].message);
            return;
        }
        // TODO: handle the password reset process here later
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: "form",
                noValidate: true,
                onSubmit: handleSubmit,
                sx: {backgroundImage: "none"},
            }}
        >
            <DialogTitle>Reset password</DialogTitle>
            <DialogContent
                sx={{display: "flex", flexDirection: "column", gap: 2, width: "100%"}}
            >
                <DialogContentText>
                    Enter your account&apos;s email address, and we&apos;ll send you a link
                    to reset your password.
                </DialogContentText>
                <FormControl error={!!emailError} fullWidth>
                    <OutlinedInput
                        autoFocus
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        placeholder="Email address"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        fullWidth
                    />
                    {emailError && <FormHelperText>{emailError}</FormHelperText>}
                </FormControl>
            </DialogContent>
            <DialogActions sx={{pb: 3, px: 3}}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" type="submit">
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ForgotPassword;
