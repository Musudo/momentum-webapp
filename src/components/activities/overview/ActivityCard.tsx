import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {Box, CardActionArea, Paper, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {ActivityTypesEnum} from "../../../types/enums/ActivityTypesEnum";
import {IActivity} from "../../../types/models/IActivity";
import {useQuery} from "@tanstack/react-query";
import {ITask} from "../../../types/models/ITask.ts";
import {fetchTask} from "../../../utils/axios/configs/taskAxios.ts";
import {capitalizeFirstLetter} from "../../../utils/stringHelpers.ts";

type TActivityCardProps = {
    activity: IActivity;
};

// eslint-disable-next-line react-refresh/only-export-components
export const renderIcon = (type: string) => {
    if (type === ActivityTypesEnum.Phone) {
        return <LocalPhoneIcon fontSize="small" color="primary"/>;
    } else if (type === ActivityTypesEnum.Online) {
        return <ConnectWithoutContactIcon fontSize="small" color="primary"/>;
    } else if (type === ActivityTypesEnum.Physical) {
        return <PeopleIcon fontSize="small" color="primary"/>;
    }
};

const ActivityCard = ({activity}: TActivityCardProps) => {
    const {t} = useTranslation();

    const {
        data: tasks,
    } = useQuery<ITask[]>({
        queryKey: ["tasks", activity.id],
        queryFn: async () => {
            const res = await fetchTask.get(`/by-activity-id/${activity.id}`);
            return res.data;
        }
    });

    const amountTasks = tasks ? tasks.filter(task => !task.completed).length : 0;
    const amountParticipants = (activity.contacts?.length ?? 0) + (activity.externalParticipants?.length ?? 0);

    return (
        <Paper
            component={Link}
            to={`/activities/${activity.id}`}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 4,
                textDecoration: "none",
                marginY: 1
            }}
            elevation={2}
        >
            <CardActionArea sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: 170,
                width: 290,
            }}>
                {renderIcon(capitalizeFirstLetter(activity.type))}
                <Box textAlign="center" mb={4}>
                    <Typography variant="subtitle2">{activity.subject}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {new Intl.DateTimeFormat('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        }).format(new Date(activity.startTime))}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {new Intl.DateTimeFormat('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit'
                        }).format(new Date(activity.startTime))}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-around" width="100%">
                    <Box display="flex" alignItems="center">
                        <PersonIcon color={amountParticipants > 0 ? "success" : "disabled"} sx={{mr: 1}}/>
                        <Typography variant="caption" color="textSecondary">
                            {amountParticipants} {" "}
                            {t("Activities overview page.Card.Participants")}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <TaskAltIcon color={amountTasks > 0 ? "success" : "disabled"} sx={{mr: 1}}/>
                        <Typography variant="caption" color="textSecondary">
                            {amountTasks}{" "}
                            {t("Activities overview page.Card.Tasks")}
                        </Typography>
                    </Box>
                </Box>
            </CardActionArea>
        </Paper>
    );
};

export default ActivityCard;
