import {SyntheticEvent, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm} from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import {Autocomplete, AutocompleteRenderInputParams, FormControl, InputAdornment, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {IContact} from "../../../../types/models/IContact";
import PersonIcon from '@mui/icons-material/Person';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchContact} from "../../../../utils/axios/configs/contactAxios.ts";
import {fetchActivity} from "../../../../utils/axios/configs/activityAxios.ts";

type TAddParticipantsDialogProps = {
    activityId: string;
}

const AddParticipantsDialog = ({activityId}: TAddParticipantsDialogProps) => {
    // TODO: find a way to properly validate autocomplete, or replace it by select
    const [isDisabled, setIsDisabled] = useState(true);
    const [openParticipantDialog, setOpenParticipantDialog] = useState(false);
    const queryClient = useQueryClient();

    const {handleSubmit, setValue} = useForm<{
        contactId: object;
    }>({
        defaultValues: {
            contactId: {},
        }
    });

    const {
        data: contacts,
    } = useQuery({
        queryKey: ["contacts"],
        queryFn: async () => {
            const res = await fetchContact.get("");
            return res.data;
        },
    });

    const onSubmit = (data: object) => {
        addParticipantMutation.mutate(data);
    }

    const addParticipantMutation = useMutation(
        {
            mutationFn: (data: object) => fetchActivity.patch(`/${activityId}/add-participant`, data),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['activity']});
            }
        }
    );

    const handleParticipantDialogClose = () => {
        setOpenParticipantDialog(false);
        setIsDisabled(true);
    };

    if (!contacts) {
        return <div>Error</div>;
    }

    return (
        <>
            <Button variant="contained"
                    size="small"
                    onClick={() => setOpenParticipantDialog(true)}
                    startIcon={<AddIcon/>}>
                Add Participant
            </Button>
            <Dialog open={openParticipantDialog} onClose={handleParticipantDialogClose} fullWidth>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Add new participant</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            There will be sent a confirmation email to this participant.
                        </DialogContentText>
                        <Grid>
                            <FormControl variant="standard" fullWidth sx={{minWidth: 120}}>
                                <Autocomplete
                                    options={contacts ? contacts.map((c: IContact) => c.firstName + " " + c.lastName) : []}
                                    renderInput={(params: AutocompleteRenderInputParams) => (
                                        <TextField {...params}
                                                   label="Contact"
                                                   variant="standard"
                                                   slotProps={{
                                                       input: {
                                                           ...params.InputProps,
                                                           startAdornment: (
                                                               <InputAdornment
                                                                   position="start">
                                                                   <PersonIcon
                                                                       color="primary"/>
                                                               </InputAdornment>)
                                                       },
                                                       inputLabel: {
                                                           children: null // otherwise Textfield gives error because of params
                                                       }
                                                   }}
                                        />
                                    )}
                                    onChange={(_event: SyntheticEvent, value: any) => {
                                        setValue("contactId", contacts.find((c: IContact) => c.firstName + " " + c.lastName === value)?.id ?? 0);
                                        setIsDisabled(false);
                                    }}
                                />
                            </FormControl>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button type="button" size="small" variant="text"
                                onClick={handleParticipantDialogClose}>Close</Button>
                        <Button type="submit" size="small" variant="contained" disabled={isDisabled} color={isDisabled ? "info" : "primary"}>
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default AddParticipantsDialog;