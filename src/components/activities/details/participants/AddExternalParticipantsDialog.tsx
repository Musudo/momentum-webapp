import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm} from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import {FormHelperText, InputAdornment, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import {VALID_EMAIL_REGEXP} from "../../../../constants/commonConstants.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {fetchActivity} from "../../../../utils/axios/configs/activityAxios.ts";

type TAddExternalParticipantsDialogProps = {
    activityId: string;
}

const AddExternalParticipantsDialog = ({activityId}: TAddExternalParticipantsDialogProps) => {
    // TODO: find a way to properly validate autocomplete, or replace it by select
    const [, setIsDisabled] = useState(true);
    const [openExternalParticipantDialog, setOpenExternalParticipantDialog] = useState(false);
    const queryClient = useQueryClient();

    const {register, handleSubmit, formState: {errors}} = useForm<{
        name: string;
        email: string;
    }>({
        defaultValues: {
            name: "",
            email: "",
        }
    });

    const onSubmit = (data: any) => {
        addParticipantMutation.mutate(data);
    }


    const addParticipantMutation = useMutation(
        {
            mutationFn: (data: object) => fetchActivity.patch(`/${activityId}/add-external-participant`, data),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['activity']});
            }
        }
    );

    const handleExternalParticipantDialogClose = () => {
        setOpenExternalParticipantDialog(false);
        setIsDisabled(true);
    };

    return (
        <div>
            <Button variant="contained"
                    size="small"
                    onClick={() => setOpenExternalParticipantDialog(true)}
                    startIcon={<AddIcon/>}>
                Add Ext. Participant
            </Button>
            <Dialog open={openExternalParticipantDialog} onClose={handleExternalParticipantDialogClose} fullWidth>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Add new external participant</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            There will be sent a confirmation email to this external participant.
                        </DialogContentText>
                        <Grid>
                            <TextField
                                fullWidth
                                variant="standard"
                                margin="normal"
                                label="Name"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon/>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                                {...register("name", {
                                    required: "Name is required"
                                })}
                            />
                            <FormHelperText error>{errors.name && errors.name.message}</FormHelperText>
                            <TextField
                                fullWidth
                                variant="standard"
                                margin="normal"
                                label="Email"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AlternateEmailIcon/>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: VALID_EMAIL_REGEXP,
                                        message: "Email is not a valid email"
                                    }
                                })}
                            />
                            <FormHelperText error>{errors.email && errors.email.message}</FormHelperText>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button type="button" size="small" variant="text"
                                onClick={handleExternalParticipantDialogClose}>Close</Button>
                        <Button type="submit" size="small" variant="contained">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default AddExternalParticipantsDialog;