import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, CardActionArea, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ActivityTypesEnum } from "../../../types/enums/ActivityTypesEnum";
import { IActivity } from "../../../types/models/IActivity";

type TProps = {
  activity: IActivity;
};

const ActivityCard = ({ activity }: TProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const renderIcon = () => {
    if (activity.type === ActivityTypesEnum.Phone) {
      return <LocalPhoneIcon color="secondary" />;
    } else if (activity.type === ActivityTypesEnum.Online) {
      return <ConnectWithoutContactIcon color="secondary" />;
    } else if (activity.type === ActivityTypesEnum.Physical) {
      return <PeopleIcon color="secondary" />;
    }
  };

  return (
    <CardActionArea onClick={() => navigate(`/activities/${activity.id}`)}>
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
            <Typography variant="caption" color="textSecondary">
              {dayjs(activity.startTime).format("DD MMM YYYY HH:mm")}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-around" width="100%">
          <Box display="flex" alignItems="center">
            <PersonIcon color="disabled" sx={{ mr: 1 }} />
            <Typography variant="caption" color="textSecondary">
              {t("Activities overview page.Card.Participants")}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <TaskAltIcon color="disabled" sx={{ mr: 1 }} />
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
