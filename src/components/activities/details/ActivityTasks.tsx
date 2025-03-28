import {useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {Checkbox, IconButton, InputAdornment, List, ListItem, ListItemIcon, TextField, useTheme} from '@mui/material';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import {debounce} from 'lodash';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {ITask} from '../../../types/models/ITask';
import {fetchTask} from '../../../utils/axios/configs/taskAxios';
import {gray} from "../../../shared-theme/themePrimitives.ts";

type TActivityTasksProps = {
    activityId: string;
}

const ActivityTasks = ({activityId}: TActivityTasksProps) => {
    const queryClient = useQueryClient();
    const theme = useTheme();

    const {register, handleSubmit, resetField} = useForm({
        defaultValues: {
            description: null,
            completed: false,
            activityId: activityId
        }
    });

    const {
        data: tasks,
    } = useQuery<ITask[]>({
        queryKey: ["tasks"],
        queryFn: async () => {
            const res = await fetchTask.get(`/by-activity-id/${activityId}`);
            return res.data;
        }
    });

    const createTaskMutation = useMutation(
        {
            mutationFn: (task: object) => fetchTask.post("", task),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['tasks']});
            }
        }
    );

    const handleCreateTask = async (data: object) => {
        createTaskMutation.mutate(data);
        resetField('description');
    }

    const modifyTaskMutation = useMutation(
        {
            mutationFn: (task: ITask) => fetchTask.patch(`/${task.id}`, task),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['tasks']});
            }
        }
    );

    const debouncedChangeTaskHandler = useMemo(
        () => debounce((event: any, task: ITask) => {
            task.description = event.target.value;
            modifyTaskMutation.mutate(task)
        }, 300)
        , [modifyTaskMutation]);

    const deleteTaskMutation = useMutation(
        {
            mutationFn: (id: string) => fetchTask.delete(`/${id}`),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['tasks']});
            }
        }
    );

    if (!tasks) {
        return <div>Error</div>;
    }

    return (
        <Grid
            sx={{
                bgcolor: theme.palette.mode === "dark" ? gray[900] : "#edf3f0",
                padding: "0 1em",
                borderRadius: 4,
                display: "flex",
                alignItems: "stretch",
                minHeight: "15em",
                minWidth: "25em",
            }}
        >
            <List sx={{width: '100%'}}>
                <TextField placeholder="New task"
                           fullWidth
                           variant="standard"
                           sx={{marginBottom: 2}}
                           slotProps={{
                               input: {
                                   endAdornment: (
                                       <InputAdornment position="start">
                                           <IconButton onClick={(event) => handleSubmit(handleCreateTask)(event)}>
                                               <SendIcon/>
                                           </IconButton>
                                       </InputAdornment>
                                   )
                               }
                           }}
                           {...register("description")}
                           onKeyDown={(event) => {
                               if (event.key === "Enter") {
                                   handleSubmit(handleCreateTask)(event);
                               }
                           }}
                />
                {tasks.map((task: ITask) => (
                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete task">
                                <DeleteIcon sx={{opacity: 0.5}} onClick={() => deleteTaskMutation.mutate(task.id)}/>
                            </IconButton>
                        }
                        disablePadding
                        divider
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <ListItemIcon>
                            {/*TODO: fix checkbox layout*/}
                            <Checkbox
                                edge="start"
                                checked={task.completed}
                                color="success"
                                disableRipple
                                disableFocusRipple
                                sx={{
                                    '&.Mui-focusVisible': {
                                        outline: 'none',
                                    },
                                }}
                                onChange={() => {
                                    task.completed = !task.completed;
                                    modifyTaskMutation.mutate(task);
                                }}
                            />
                        </ListItemIcon>
                        <TextField variant="standard"
                                   slotProps={{
                                       input: {
                                           disableUnderline: true
                                       }
                                   }}
                                   defaultValue={task.description}
                                   sx={{
                                       opacity: task.completed ? "0.6" : "1",
                                       width: "100%"
                                   }}
                                   onKeyDown={(event) => debouncedChangeTaskHandler(event, task)}/>
                    </ListItem>
                ))}
            </List>
        </Grid>
    );
}

export default ActivityTasks;