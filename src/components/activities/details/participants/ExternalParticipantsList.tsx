import {
    Avatar,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    Typography
} from "@mui/material";
import {IExternalParticipant} from "../../../../types/models/IExternalParticipant";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import {Link} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {fetchActivity} from "../../../../utils/axios/configs/activityAxios.ts";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClearIcon from '@mui/icons-material/Clear';

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
        <>
            {externalParticipants.map((externalParticipant: IExternalParticipant, index: number) => (
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
                    <ListItem key={index} sx={{marginBottom: 1}}
                              secondaryAction={
                                  <Box sx={{display: "flex"}}>
                                      <Tooltip title="Add as a contact">
                                          <IconButton
                                              edge="end"
                                              aria-label="Add as a contact"
                                              color="primary"
                                              disableRipple
                                              disableFocusRipple
                                              sx={{marginRight: 1, textDecoration: 'none'}}
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
                                                      disableRipple
                                                      disableFocusRipple
                                                      onClick={() => deleteExternalParticipantMutation.mutate(externalParticipant.id)}
                                          >
                                              <ClearIcon/>
                                          </IconButton>
                                      </Tooltip>
                                  </Box>
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
        </>
    );
}

export default ExternalParticipantsList;