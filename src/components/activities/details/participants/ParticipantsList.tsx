import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {IContact} from "../../../../types/models/IContact";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {fetchActivity} from "../../../../utils/axios/configs/activityAxios.ts";

type TParticipantsListProps = {
    activityId: string;
    contacts: IContact[] | undefined;
}

const ParticipantsList = ({contacts, activityId}: TParticipantsListProps) => {
    const queryClient = useQueryClient();

    const deleteParticipantMutation = useMutation(
        {
            mutationFn: (contactId: string) => fetchActivity.delete(`/${activityId}/delete-participant/${contactId}`),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['activity']});
            }
        }
    );

    if (!contacts || contacts.length === 0) {
        return <div>No participants</div>;
    }

    return (
        <div>
            {contacts?.map((contact: IContact) => (
                <List sx={{width: '100%', maxWidth: 800, bgcolor: 'background.paper'}}>
                    <ListItem key={contact.id}
                              secondaryAction={
                                  <Tooltip title="Remove">
                                      <IconButton edge="end"
                                                  aria-label="Remove"
                                                  color="default"
                                                  onClick={() => deleteParticipantMutation.mutate(contact.id)}
                                      >
                                          <HighlightOffIcon/>
                                      </IconButton>
                                  </Tooltip>
                              }
                              disablePadding>
                        <ListItemAvatar>
                            <Avatar>
                                <AccountCircleIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={<Typography>{`${contact.firstName} ${contact.lastName}`}</Typography>}
                                      secondary={<span>{`${contact.email1}, ${contact.phone1}`}</span>}/>
                    </ListItem>
                </List>
            ))}
        </div>
    );
}

export default ParticipantsList;