import {IActivity} from "../../../types/models/IActivity";
import {Box, Typography} from "@mui/material";
import ActivityCard from "./ActivityCard";

type TProps = {
    activities: IActivity[];
    columnName: string;
};

const ActivitiesColumn = ({activities, columnName}: TProps) => {
    return (
        <Box flexDirection="column">
            {columnName && (
                <Typography align="center" variant="subtitle1" mt={2}>
                    {columnName}
                </Typography>
            )}
            <Box
                overflow="auto"
                height="70vh"
                flexDirection="column"
                display="flex"
                sx={{
                    flex: 1,
                    paddingTop: "8px",
                    paddingBottom: "16px",
                    bgcolor: "#eaeaee",
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
                {activities.length > 0 &&
                    activities.map((activity) => (
                        <Box key={activity.id} mb={2}>
                            <ActivityCard key={activity.id} activity={activity}/>
                        </Box>
                    ))}
            </Box>
        </Box>
    );
};

export default ActivitiesColumn;
