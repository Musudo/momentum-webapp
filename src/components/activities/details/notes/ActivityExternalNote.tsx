import {useState} from 'react';
import {Box, Button, IconButton, TextField, Tooltip, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {IActivity} from "../../../../types/models/IActivity";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {fetchActivity} from "../../../../utils/axios/configs/activityAxios.ts";

type TActivityExternalNoteProps = {
    activity: IActivity;
}

const ActivityExternalNote = ({activity}: TActivityExternalNoteProps) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const queryClient = useQueryClient();

    const handleCancelEditMode = () => {
        setIsEditing(false);
        setIsHovering(false);
    };

    const modifyExternalNoteMutation = useMutation(
        {
            mutationFn: (data: object) => fetchActivity.patch(`/${activity.id}/external-note`, data),
            onSuccess: () => {
                handleCancelEditMode();
                queryClient.invalidateQueries({queryKey: ['activity']});
            }
        }
    );

    const {register, handleSubmit} = useForm<{
        externalNote: string | undefined;
    }>({
        defaultValues: {
            externalNote: activity?.externalNote
        }
    });

    return (
        <Box mb={2}
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}>
            <Box mb={1} color="text.secondary">
                <Typography component="span" variant="body1">
                    External note (client will be able to see this note)
                </Typography>
            </Box>
            {isEditing ? (
                <form onSubmit={handleSubmit((note: object) => modifyExternalNoteMutation.mutate(note))}>
                    <Box>
                        <TextField
                            label="External note"
                            variant="filled"
                            fullWidth
                            multiline
                            {...register("externalNote")}/>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" mt={1}>
                        <Button
                            sx={{mr: 1}}
                            onClick={handleCancelEditMode}
                            color="primary"
                            size="small"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            size="small"
                        >
                            Update Note
                        </Button>
                    </Box>
                </form>
            ) : (
                <Box sx={{
                    bgcolor: '#edf3f0',
                    padding: '0 1em',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'stretch',
                    marginBottom: 1,
                    minHeight: '4em'
                }}>
                    <Box flex={1}>
                        {activity?.externalNote
                            ?.split('\n')
                            .map((paragraph: string, index: number) => (
                                <Box
                                    component="p"
                                    fontFamily="fontFamily"
                                    fontSize="body1.fontSize"
                                    lineHeight={1.3}
                                    marginBottom={2.4}
                                    key={index}
                                >
                                    {paragraph}
                                </Box>
                            ))}
                    </Box>
                    <Box sx={{
                        marginLeft: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        visibility: isHovering ? 'visible' : 'hidden',
                    }}>
                        <Tooltip title="Edit note">
                            <IconButton
                                size="small"
                                onClick={() => setIsEditing(true)}
                            >
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default ActivityExternalNote;