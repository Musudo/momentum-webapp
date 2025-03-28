import {CardContainer} from "./cardContainer.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import {Box, Button, FormHelperText, Snackbar, SnackbarCloseReason, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {VALID_EMAIL_REGEXP} from "../constants/constants.ts";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import {useMutation} from "@tanstack/react-query";
import {fetchUser} from "../utils/axios/configs/userAxios.ts";
import {setUser} from "../redux/slice/userSlice.ts";

const Profile = () => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
    });

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }
    });

    const modifyUserMutation = useMutation(
        {
            mutationFn: (data: object) => fetchUser.patch(`/${user.id}`, data),
            onSuccess: (res) => {
                dispatch(setUser(res.data));
                setIsEditMode(false);
                setSnackbarState({
                    ...snackbarState,
                    open: true,
                    message: "User profile updated",
                });
            },
            onError: () => {
                setSnackbarState({
                    ...snackbarState,
                    open: true,
                    message: "Failed to update a user profile",
                });
            },
        }
    );

    return (
        <CardContainer>
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
            <Typography variant="h5" component="div">
                User profile
            </Typography>
            <form onSubmit={handleSubmit((data) => {
                modifyUserMutation.mutate(data);
            })}>
                <Stack spacing={2}>
                    <TextField
                        id="firstName"
                        label="First name"
                        fullWidth
                        disabled={!isEditMode}
                        {...register("firstName", {
                            required: "First name is required",
                            minLength: {value: 2, message: "Name must be longer than 1 character"}
                        })}
                    />
                    <FormHelperText error>{errors?.firstName?.message}</FormHelperText>
                    <TextField
                        id="lastName"
                        label="Last name"
                        fullWidth
                        disabled={!isEditMode}
                        {...register("lastName", {
                            required: "Last name is required",
                            minLength: {value: 2, message: "Name must be longer than 1 character"}
                        })}
                    />
                    <FormHelperText error>{errors?.lastName?.message}</FormHelperText>
                    <TextField
                        id="email"
                        label="Email"
                        fullWidth
                        disabled={!isEditMode}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: VALID_EMAIL_REGEXP,
                                message: "Email is not a valid email"
                            }
                        })}
                    />
                    <FormHelperText error>{errors?.email?.message}</FormHelperText>
                    <Box>
                        <Button
                            variant="text"
                            onClick={() => {
                                setSnackbarState({
                                    ...snackbarState,
                                    open: true,
                                    message: `A reset password email has been sent to ${user.email}`,
                                });
                            }}
                        >
                            Change password
                        </Button>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "end", gap: 1}}>
                        {isEditMode ? (
                            <>
                                <Button
                                    type="button"
                                    variant="text"
                                    onClick={() => {
                                        setIsEditMode(false);
                                        reset();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    Save
                                </Button>
                            </>
                        ) : (
                            <Button
                                type="button"
                                variant="text"
                                startIcon={<EditIcon/>}
                                onClick={() => setIsEditMode(!isEditMode)}
                            >
                                Edit
                            </Button>
                        )}
                    </Box>
                </Stack>
            </form>
        </CardContainer>
    )
}

export default Profile;