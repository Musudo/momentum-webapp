import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {IActivity} from "../../../types/models/IActivity";

type TProps = {
    activity: IActivity;
};

const ArchivedActivityCard = ({activity}: TProps) => {

    return (
        <Card
            sx={{width: 210, height: 120, textDecoration: 'none'}}
            component={Link}
            to={`/activities/${activity.id}`}
        >
            <CardActionArea sx={{width: 210, height: 120}}>
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
        </Card>
    );
};

export default ArchivedActivityCard;
