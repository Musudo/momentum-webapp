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

type TProps = {
    activity: IActivity;
};

const ActivityCard = ({activity}: TProps) => {
    const {t} = useTranslation();

    const renderIcon = () => {
        if (activity.type === ActivityTypesEnum.Phone) {
            return <LocalPhoneIcon color="secondary"/>;
        } else if (activity.type === ActivityTypesEnum.Online) {
            return <ConnectWithoutContactIcon color="secondary"/>;
        } else if (activity.type === ActivityTypesEnum.Physical) {
            return <PeopleIcon color="secondary"/>;
        }
    };

    return (
        <CardActionArea component={Link} to={`/activities/${activity.id}`}>
            <Paper
                sx={{
                    height: 140,
                    width: 265,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "1em",
                }}
                elevation={1}
            >
                <Box display="flex" flexDirection="column" alignItems="center">
                    {renderIcon()}
                    <Box textAlign="center" marginTop={1}>
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
                </Box>
                <Box display="flex" justifyContent="space-around" width="100%">
                    <Box display="flex" alignItems="center">
                        <PersonIcon color="disabled" sx={{mr: 1}}/>
                        <Typography variant="caption" color="textSecondary">
                            {t("Activities overview page.Card.Participants")}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <TaskAltIcon color="disabled" sx={{mr: 1}}/>
                        <Typography variant="caption" color="textSecondary">
                            {t("Activities overview page.Card.Tasks")}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </CardActionArea>
    );
};

export default ActivityCard;
