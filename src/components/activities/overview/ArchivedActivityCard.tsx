import {CardActionArea, CardContent, Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {IActivity} from "../../../types/models/IActivity";

type TProps = {
    activity: IActivity;
};

const ArchivedActivityCard = ({activity}: TProps) => {

    return (
        <Paper
            sx={{
                width: {xs: 290, md: 230},
                height: 130,
                textDecoration: 'none',
                borderRadius: 4,
            }}
            component={Link}
            to={`/activities/${activity.id}`}
            elevation={2}
        >
            <CardActionArea
                sx={{
                    width: 230,
                    height: 130,
                    padding: 2
                }}
            >
                <CardContent>
                    <Typography sx={{fontSize: 12}} color="text.secondary" gutterBottom>
                        {activity.type}
                    </Typography>
                    <Typography variant="h6" sx={{fontSize: 14}} component="div" noWrap>
                        {activity.subject}
                    </Typography>
                    <Typography sx={{fontSize: 14}} color="text.secondary">
                        {new Intl.DateTimeFormat('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        }).format(new Date(activity.startTime))}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Paper>
    );
};

export default ArchivedActivityCard;
