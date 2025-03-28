import {IActivity} from "../../../types/models/IActivity";
import {Box, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ActivityCard from "./ActivityCard";

type TActivitiesColumnProps = {
    activities: IActivity[];
    columnName: string;
    isMobile?: boolean;
};

const ActivitiesColumn = ({activities, columnName, isMobile}: TActivitiesColumnProps) => {
    return (
        <Grid>
            {isMobile ? (
                <></>
            ) : (
                <Typography align="center" variant="subtitle1">
                    {columnName}
                </Typography>
            )}
            <Box
                overflow="auto"
                height="65vh"
                flexDirection="column"
                display="flex"
                sx={{
                    flex: 1,
                    "&:first-of-type": {
                        paddingLeft: "5px",
                        borderTopLeftRadius: 5,
                    },
                    "&:last-child": {
                        paddingRight: "5px",
                        borderTopRightRadius: 5,
                    },
                }}
            >
                {activities.map((activity) => (
                    // <Box key={activity.id} mb={1}>
                        <ActivityCard key={activity.id} activity={activity}/>
                    // </Box>
                ))}
            </Box>
        </Grid>
    );
};

export default ActivitiesColumn;
