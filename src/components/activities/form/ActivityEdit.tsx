import * as React from "react";
import {useEffect, useState} from "react";
import {Box, Button, Container, Paper, Snackbar, SnackbarCloseReason, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {IActivity} from "../../../types/models/IActivity";
import {useMutation, useQuery} from "@tanstack/react-query";
import {FormTypesEnum} from "../../../types/enums/ComponentPropsEnums";
import {fetchActivity} from "../../../utils/axios/configs/activityAxios.ts";
import ActivityForm from "./ActivityForm.tsx";
import {capitalizeFirstLetter} from "../../../utils/stringHelpers.ts";

const ActivityEdit = () => {
    const {id} = useParams();
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
    });

    const {
        data: activity,
    } = useQuery<IActivity>({
        queryKey: ["activity"],
        queryFn: async () => {
            const res = await fetchActivity.get(`/${id}`);
            return res.data;
        }
    });

    const {register, control, handleSubmit, reset, setValue, formState: {errors}} = useForm<IActivity>({
        defaultValues: {
            type: capitalizeFirstLetter(activity?.type ?? "Online"),
            subject: activity?.subject,
            externalNote: activity?.externalNote,
            internalNote: activity?.internalNote,
            startTime: activity?.startTime,
            endTime: activity?.endTime,
        }
    });

    useEffect(() => {
        if (activity) {
            reset({
                ...activity,
                type: capitalizeFirstLetter(activity?.type ?? "Online"),
            });
        }
    }, [activity, reset]);

    const onSubmit = (data: IActivity) => {
        data.type = data.type.toUpperCase();
        delete data.externalParticipants;

        modifyActivityMutation.mutate(data);
    }

    const modifyActivityMutation = useMutation(
        {
            mutationFn: (data: IActivity) => fetchActivity.patch(`/${id}`, data),
            onSuccess: () => {
                setSnackbarState({
                    ...snackbarState,
                    open: true,
                    message: "Activity edited",
                });
            },
            onError: (err) => {
                console.log("Error: ", err);
                setSnackbarState({
                    ...snackbarState,
                    open: true,
                    message: "Failed to edit an activity",
                });
            },
        }
    );

    if (!activity) {
        return <div>Error</div>;
    }

    return (
        <Container component="main" maxWidth="sm" sx={{mb: 4}}>
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Typography component="h1" variant="h4" align="center">
                        Edit Activity
                    </Typography>
                    <ActivityForm register={register}
                                  controller={control}
                                  errors={errors}
                                  setValue={setValue}
                                  activity={activity}
                                  formType={FormTypesEnum.Edit}
                    />
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{mt: 3, ml: 1}}>
                            Save
                        </Button>
                    </Box>
                </Paper>
            </form>
        </Container>
    );
}

export default ActivityEdit;