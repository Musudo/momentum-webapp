import {Box, Button, Divider, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
import {IActivity} from "../../../types/models/IActivity";
import {addressFormatter} from "../../../utils/DataFormatterUtil";

type TActivityAsideProps = {
    activity: IActivity;
}

const ActivityAside = ({activity}: TActivityAsideProps) => {
    const navigate = useNavigate();

    let address = "";
    if (activity.institution) {
        address = addressFormatter(activity.institution.countryCode, activity.institution.city,
            activity.institution.postalCode, activity.institution.street, activity.institution.buildingNumber);
    }

    return (
        <Box
            sx={{
                width: {xs: '100%', md: 300},
                minWidth: {xs: 250},
            }}
        >
            <Box textAlign="left" mb={2}>
                <Button type="button" startIcon={<EditIcon/>}
                        onClick={() => navigate(`/activities/edit/${activity.id}`)}>Edit Activity</Button>
            </Box>
            <Typography variant="subtitle2" fontWeight="bold">Institution info</Typography>
            <Divider/>
            <Box mt={1}>
                <Typography variant="body2">
                    {activity.institution?.name}
                </Typography>
            </Box>
            <Box mt={1}>
                <Typography variant="body2">
                    {address}
                </Typography>
            </Box>
        </Box>
    );
}

export default ActivityAside;