import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { IActivity } from "../../../types/models/IActivity";

type TProps = {
  activity: IActivity;
};

const ArchivedActivityCard = ({ activity }: TProps) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ width: 210, height: 120 }}
      onClick={() => navigate(`/activities/${activity.id}`)}
    >
      <CardActionArea sx={{ width: 210, height: 120 }}>
        <CardContent>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            {activity.type}
          </Typography>
          <Typography variant="h6" sx={{ fontSize: 14 }} component="div" noWrap>
            {activity.subject}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {dayjs(activity.startTime).format("DD MMM YYYY HH:mm")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ArchivedActivityCard;
