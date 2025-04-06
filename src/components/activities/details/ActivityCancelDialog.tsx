import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {IActivity} from "../../../types/models/IActivity";
import {useMutation} from "@tanstack/react-query";
import {fetchActivity} from "../../../utils/axios/configs/activityAxios.ts";

type TActivityCancelDialogProps = {
    open: boolean;
    setOpen: (value: boolean) => void;
    activity: IActivity;
}

const ActivityCancelDialog = (props: TActivityCancelDialogProps) => {
    const {open, setOpen, activity} = props;

    const cancelActivity = (sendEmail: boolean) => {
        if (sendEmail) {
            deleteActivityMutation.mutate(activity.id);
        } else {
            deleteActivityMutation.mutate(activity.id);
        }
    }

    const deleteActivityMutation = useMutation(
        {
            mutationFn: (id: string) => fetchActivity.delete(`/${id}`),
            onSuccess: () => {
                window.location.href = "/activities";
            }
        }
    );

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Delete activity '{activity.subject}'
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want also to send a cancellation email to participants?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => setOpen(false)} size="small">
                    Cancel
                </Button>
                {/*<Button variant="text" onClick={() => cancelActivity(true)} size="small">*/}
                {/*    Delete with email*/}
                {/*</Button>*/}
                <Button variant="text" onClick={() => cancelActivity(false)} size="small">
                    Just delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ActivityCancelDialog;