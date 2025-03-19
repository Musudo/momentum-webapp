import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography} from "@mui/material";
import {IExternalParticipant} from "../../../../types/models/IExternalParticipant";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Link} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {fetchActivity} from "../../../../utils/axios/configs/activityAxios.ts";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type TExternalParticipantsListProps = {
    externalParticipants: IExternalParticipant[] | undefined;
    activityId: string;
}

const ExternalParticipantsList = ({externalParticipants, activityId}: TExternalParticipantsListProps) => {
    const queryClient = useQueryClient();

    const deleteExternalParticipantMutation = useMutation(
        {
            mutationFn: (externalParticipantId: string) => fetchActivity.delete(`/${activityId}/delete-external-participant/${externalParticipantId}`),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['activity']});
            }
        }
    );

    if (!externalParticipants || externalParticipants.length === 0) {
        return <div>No external participants</div>;
    }

    return (
        <div>
            {externalParticipants.map((externalParticipant: IExternalParticipant, index: number) => (
                <List key={index} sx={{width: '100%', maxWidth: 800, bgcolor: 'background.paper'}}>
                    <ListItem key={externalParticipant.id} sx={{marginBottom: 1}}
                              secondaryAction={
                                  <div>
                                      <Tooltip title="Add as a contact">
                                          <IconButton
                                              edge="end"
                                              aria-label="Add as a contact"
                                              color="primary"
                                              sx={{marginRight: 1}}
                                              component={Link}
                                              to="/contacts/create"
                                              state={{
                                                  email: externalParticipant.email,
                                                  name: externalParticipant.name
                                          }}
                                          >
                                              <PersonAddOutlinedIcon/>
                                          </IconButton>
                                      </Tooltip>
                                      <Tooltip title="Remove">
                                          <IconButton edge="end"
                                                      aria-label="Remove"
                                                      color="default"
                                                      onClick={() => deleteExternalParticipantMutation.mutate(externalParticipant.id)}
                                          >
                                              <HighlightOffIcon/>
                                          </IconButton>
                                      </Tooltip>
                                  </div>
                              }
                              disablePadding>
                        <ListItemAvatar>
                            <Avatar>
                                <AccountCircleIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText id={externalParticipant.email}
                                      primary={<Typography>{externalParticipant.email}</Typography>}/>
                    </ListItem>
                </List>
            ))}
        </div>
    );
}

export default ExternalParticipantsList;