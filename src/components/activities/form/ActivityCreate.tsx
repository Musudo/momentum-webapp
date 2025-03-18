import * as React from "react";
import {ChangeEvent, useState} from "react";
import {
    Box,
    Button,
    Container,
    FormControlLabel,
    FormHelperText,
    Paper,
    Snackbar,
    SnackbarCloseReason,
    Step,
    StepLabel,
    Stepper,
    Switch,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import dayjs from "dayjs";
import {useTranslation} from "react-i18next";
import {useMutation} from "@tanstack/react-query";
import {IActivity} from "../../../types/models/IActivity";
import {FormTypesEnum} from "../../../types/enums/ComponentPropsEnums";
import ActivityForm from "./ActivityForm.tsx";
import ParticipantForm from "./ParticipantForm.tsx";
import {fetchActivity} from "../../../utils/axios/configs/activityAxios.ts";
import ExternalParticipantForm from "./ExternalParticipantForm.tsx";

const ActivityCreate = () => {
    const {t} = useTranslation();
    const [activeStep, setActiveStep] = useState(0);
    const steps = [t("Activity form.Participants"), t("Activity form.Activity")];
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
    });
    const {activityType} = useParams();

    const {
        register,
        // unregister,
        control,
        handleSubmit,
        setValue,
        getValues,
        trigger,
        formState: {errors},
    } = useForm<IActivity>({
        defaultValues: {
            subject: "",
            tagIds: [],
            externalNote: "",
            internalNote: "",
            type: activityType,
            startTime: dayjs().format('YYYY-MM-DD[T]HH:mm:ss'),
            endTime: dayjs().add(60, 'minutes').format('YYYY-MM-DD[T]HH:mm:ss'),
            emailSentAt: "",
            contactIds: [],
            institutionName: "",
            externalParticipants: []
        },
    });

    const onSubmit = (data: IActivity) => {
        data.type = data.type.toUpperCase();
        createActivityMutation.mutate(data);
    }

    const createActivityMutation = useMutation(
        {
            mutationFn: (data: object) => fetchActivity.post("", data),
            onSuccess: () => {
                setSnackbarState({
                    ...snackbarState,
                    open: true,
                    message: "Activity created",
                });

                setTimeout(() => {
                    window.location.href = "/activities";
                }, 2000);
            },
            onError: (err) => {
                console.log("Error: ", err);
                setSnackbarState({
                    ...snackbarState,
                    open: true,
                    message: "Failed to create an activity",
                });
            },
        }
    );

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return participantStep;
            case 1:
                return activityStep;
            default:
                throw new Error("Unknown step");
        }
    }

    const participantStep = (
        <div>
            <ParticipantForm
                control={control}
                errors={errors}
                setValue={setValue}
            />
            <ExternalParticipantForm setValue={setValue}/>
        </div>
    );

    const activityStep = (
        <div>
            <ActivityForm
                register={register}
                controller={control}
                errors={errors}
                activity={null}
                setValue={setValue}
                formType={FormTypesEnum.Create}
            />
            <Grid mt={2}>
                <FormControlLabel
                    control={<Switch onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        if (event.target.checked) {
                            setValue("emailSentAt", dayjs(getValues("startTime")).format('YYYY-MM-DD[T]HH:mm:ss'));
                        }
                    }}/>}
                    label={t("Activity form.Send email")}
                />
                <FormHelperText>
                    {t("Activity form.Switch on to immediately send email")}
                </FormHelperText>
            </Grid>
        </div>
    );

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
                <Paper
                    variant="outlined"
                    sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}
                >
                    <Typography component="h1" variant="h4" align="center">
                        {t("Activity form.New activity")}
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {getStepContent(activeStep)}
                    <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                        {activeStep !== 0 && (
                            <Button type="button" onClick={() => setActiveStep(activeStep - 1)} sx={{mt: 3, ml: 1}}>
                                {t("Activity form.Back")}
                            </Button>
                        )}
                        {activeStep !== steps.length - 1 && (
                            <Button
                                type="button"
                                variant="contained"
                                onClick={() => {
                                    // make sure participants are chosen before going to next step
                                    trigger(["contacts"]).then(function (result) {
                                        if (result) setActiveStep(activeStep + 1);
                                    });
                                }}
                                sx={{mt: 3, ml: 1}}
                            >
                                {t("Activity form.Next")}
                            </Button>
                        )}
                        {activeStep === steps.length - 1 && (
                            <Button type="submit" variant="contained" sx={{mt: 3, ml: 1}}>
                                {t("Activity form.Save")}
                            </Button>
                        )}
                    </Box>
                </Paper>
            </form>
        </Container>
    );
};

export default ActivityCreate;
