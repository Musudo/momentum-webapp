import {
    Avatar,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    Typography
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import {IExternalParticipant} from "../../../../types/models/IExternalParticipant";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {useNavigate} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {fetchActivity} from "../../../../utils/axios/configs/activityAxios.ts";

type TExternalParticipantsListProps = {
    externalParticipants?: IExternalParticipant[];
    activityId: string;
}

const ExternalParticipantsList = ({externalParticipants, activityId}: TExternalParticipantsListProps) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const deleteExternalParticipantMutation = useMutation(
        {
            mutationFn: (externalParticipantId: string) => fetchActivity.delete(`/${activityId}/external-participant/${externalParticipantId}`),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['activity']});
            }
        }
    );

    return (
        <div>
            <Typography variant="subtitle1" mt={3}>External participants</Typography>
            <Divider/>
            {
                externalParticipants?.map((externalParticipant: IExternalParticipant, index: number) => (
                    <List key={index} sx={{width: '100%', maxWidth: 800, bgcolor: 'background.paper'}}>
                        <ListItem key={externalParticipant.id} sx={{marginBottom: 1}}
                                  secondaryAction={
                                      <>
                                          <Tooltip title="Add as a contact">
                                              <IconButton edge="end"
                                                          aria-label="Add as a contact"
                                                          color="primary"
                                                          sx={{marginRight: 1}}
                                                          onClick={() => navigate(`/contacts/new/${externalParticipant.email}`)}
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
                                      </>
                                  }
                                  disablePadding>
                            <ListItemAvatar>
                                <Avatar>
                                    <EmailIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText id={externalParticipant.email}
                                          primary={<Typography>{externalParticipant.email}</Typography>}/>
                        </ListItem>
                    </List>
                ))
            }
        </div>
    );
}

export default ExternalParticipantsList;