import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {IContact} from "../../../../types/models/IContact";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {fetchActivity} from "../../../../utils/axios/configs/activityAxios.ts";
import ClearIcon from '@mui/icons-material/Clear';

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
        <>
            {contacts?.map((contact: IContact, index: number) => (
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 800,
                        bgcolor: 'background.paper',
                        borderRadius: 4,
                        padding: 2,
                        mb: 2
                    }}
                >
                    <ListItem key={index}
                              secondaryAction={
                                  <Tooltip title="Remove">
                                      <IconButton edge="end"
                                                  aria-label="Remove"
                                                  color="default"
                                                  disableRipple
                                                  disableFocusRipple
                                                  onClick={() => deleteParticipantMutation.mutate(contact.id)}
                                      >
                                          <ClearIcon/>
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
        </>
    );
}

export default ParticipantsList;