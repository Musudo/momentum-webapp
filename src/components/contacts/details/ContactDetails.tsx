import {useParams} from "react-router-dom";
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useMutation, useQuery} from "@tanstack/react-query";
import ContactDetailsAside from "./ContactDetailsAside.tsx";
import {fetchContact} from "../../../utils/axios/configs/contactAxios.ts";
import {coloredStringAvatar} from "../../../utils/avatarHelpers.ts";
import {CardContainer} from "../../cardContainer.tsx";
import {useTheme} from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";

const ContactDetails = () => {
    const {id} = useParams();
    const theme = useTheme();
    const [openDeleteContactDialog, setOpenDeleteContactDialog] = useState(false);

    const {
        data: contact,
    } = useQuery({
        queryKey: ["contact"],
        queryFn: async () => {
            const res = await fetchContact.get(`/${id}`);
            return res.data;
        },
    });

    const deleteContactMutation = useMutation(
        {
            mutationFn: (id: string) => fetchContact.delete(`/${id}`),
            onSuccess: () => {
                window.location.href = "/contacts";
            }
        }
    );

    if (!contact) {
        return <div>Error</div>;
    }

    return (
        <Grid container spacing={4}>
            <Grid>
                <CardContainer variant="outlined"
                               sx={{
                                   [theme.breakpoints.up('sm')]: {
                                       width: '650px',
                                   },
                               }}>
                    <ListItem alignItems="flex-start" disablePadding>
                        <ListItemAvatar>
                            <Avatar {...coloredStringAvatar(`${contact.firstName} ${contact.lastName}`)} />
                        </ListItemAvatar>
                        <ListItemText id={contact?.id}
                                      primary={
                                          <Typography variant="h5"
                                                      noWrap>{`${contact.firstName} ${contact.lastName}`}</Typography>
                                      }
                                      secondary={
                                          <Typography autoCapitalize="words" variant="body1" noWrap>
                                              {`${contact.jobTitle} at ${contact.institution.name}`}
                                          </Typography>
                                      }
                        />
                    </ListItem>
                </CardContainer>
                <Button
                    variant="text"
                    color="error"
                    startIcon={<DeleteIcon/>}
                    onClick={() => setOpenDeleteContactDialog(true)}
                >
                    Delete
                </Button>
                <Dialog
                    open={openDeleteContactDialog}
                    onClose={() => setOpenDeleteContactDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Delete contact
                    </DialogTitle>
                    <DialogActions>
                        <Button variant="contained" onClick={() => setOpenDeleteContactDialog(false)} size="small">
                            Cancel
                        </Button>
                        <Button variant="text" onClick={() => deleteContactMutation.mutate(contact.id)} size="small">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
            <Grid>
                <ContactDetailsAside contact={contact}/>
            </Grid>
        </Grid>
    );
}

export default ContactDetails;