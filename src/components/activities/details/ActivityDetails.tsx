import React, {useState} from "react";
import {IActivity} from "../../../types/models/IActivity";
import {useParams} from "react-router-dom";
import {Box, Button, Chip, Divider, Tab, Tabs, Typography,} from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import {allyProps} from "../../../props/MUIElementProps";
import {useQuery} from "@tanstack/react-query";
import {fetchActivity} from "../../../utils/axios/configs/activityAxios";
import ActivityExternalNote from "./notes/ActivityExternalNote";
import ActivityVoiceMemo from "./ActivityVoiceMemo.tsx";
import ActivityInternalNote from "./notes/ActivityInternalNote.tsx";
import ExternalParticipantsList from "./participants/ExternalParticipantsList.tsx";
import ParticipantsList from "./participants/ParticipantsList.tsx";
import ActivityTasks from "./ActivityTasks.tsx";
import {ITag} from "../../../types/models/ITag.ts";
import ActivityAside from "./ActivityAside.tsx";
import AddParticipantsDialog from "./participants/AddParticipantsDialog.tsx";
import AddExternalParticipantsDialog from "./participants/AddExternalParticipantsDialog.tsx";
import ActivityCancelDialog from "./ActivityCancelDialog.tsx";
import {CardContainer} from "../../cardContainer.tsx";
import {useTheme} from "@mui/material/styles";
import {renderIcon} from "../overview/ActivityCard.tsx";
import {capitalizeFirstLetter} from "../../../utils/stringHelpers.ts";

type TTabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
};

const ActivityDetails = () => {
    const {id} = useParams();
    const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    // const queryClient = useQueryClient();
    const [openDeleteActivityDialog, setOpenDeleteActivityDialog] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    const {
        data: activity,
    } = useQuery<IActivity>({
        queryKey: ["activity"],
        queryFn: async () => {
            const res = await fetchActivity.get(`/${id}`);
            return res.data;
        }
    });

    const TabPanel = (props: TTabPanelProps) => {
        const {children, value, index, ...other} = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`action-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{p: 3}}>
                        <Typography component="div">{children}</Typography>
                    </Box>
                )}
            </div>
        );
    };

    // const sendEmailMutation = useMutation({
    //     mutationFn: (data: object) => fetchActivity.post(`/email/activity/${activity?.id}/confirm`, data),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({queryKey: ["activity"]});
    //     },
    // });

    if (!activity) {
        return <div>Error</div>;
    }

    return (
        <Grid container spacing={4}>
            <Grid>
                <CardContainer
                    variant="outlined"
                    sx={{
                        [theme.breakpoints.up('sm')]: {
                            width: '750px',
                        },
                    }}
                >
                    <Grid display="flex" justifyContent="space-between">
                        <Grid>
                            <Typography variant="h5" marginBottom={1}>
                                {activity?.subject}{" "}
                                {activity.tags.map((tag: ITag, index: number) => (
                                    <React.Fragment key={index}>
                                        <Chip
                                            variant="outlined"
                                            color="success"
                                            label={tag.name}
                                        />{" "}
                                    </React.Fragment>
                                ))}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                                marginBottom={1}
                            >
                                {dayjs(activity?.startTime).format("DD MMM YYYY HH:mm")}
                            </Typography>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    marginBottom: 2,
                                }}
                            >
                                {renderIcon(capitalizeFirstLetter(activity.type))}
                                <Typography variant="caption" color="textSecondary">
                                    {activity?.type}
                                </Typography>
                            </div>
                        </Grid>
                        {/*<Grid>
                            {!activity.emailSentAt && (
                                <>
                                    {!isMobile ? (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<EmailIcon/>}
                                            onClick={() => sendEmailMutation.mutate([])}
                                        >
                                            Send email
                                        </Button>
                                    ) : (
                                        <IconButton
                                            color="primary"
                                            size="large"
                                            onClick={() => sendEmailMutation.mutate([])}
                                        >
                                            <EmailIcon/>
                                        </IconButton>
                                    )}
                                </>
                            )}
                        </Grid>*/}
                    </Grid>
                    <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                        <Tabs
                            value={tabValue}
                            aria-label="activity tabs"
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                            onChange={(_event: React.SyntheticEvent, value: any) => setTabValue(value)}
                        >
                            <Tab label="Notes" {...allyProps(0)} />
                            <Tab label="Tasks" {...allyProps(1)} />
                            <Tab label="Participants" {...allyProps(2)} />
                        </Tabs>
                    </Box>

                    {/*notes tab*/}
                    <TabPanel value={tabValue} index={0}>
                        <ActivityExternalNote activity={activity}/>
                        <ActivityInternalNote activity={activity}/>
                        <ActivityVoiceMemo activity={activity}/>
                    </TabPanel>

                    {/*tasks tab*/}
                    <TabPanel value={tabValue} index={1}>
                        <Grid
                            container
                            spacing={0}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <ActivityTasks activityId={activity.id}/>
                        </Grid>
                    </TabPanel>

                    {/*participants tab*/}
                    <TabPanel value={tabValue} index={2}>
                        <ParticipantsList
                            contacts={activity?.contacts}
                            activityId={activity.id}
                        />
                        <Box display="flex" justifyContent="center">
                            <AddParticipantsDialog activityId={activity.id}/>
                        </Box>
                        <Divider sx={{marginY: 2}}/>
                        <ExternalParticipantsList
                            externalParticipants={activity?.externalParticipants}
                            activityId={activity.id}
                        />
                        <Box display="flex" justifyContent="center">
                            <AddExternalParticipantsDialog activityId={activity.id}/>
                        </Box>
                    </TabPanel>
                </CardContainer>
                <Grid mt={1}>
                    <Button
                        variant="text"
                        color="error"
                        startIcon={<DeleteIcon/>}
                        onClick={() => setOpenDeleteActivityDialog(true)}
                    >
                        Delete
                    </Button>
                    <ActivityCancelDialog
                        open={openDeleteActivityDialog}
                        setOpen={setOpenDeleteActivityDialog}
                        activity={activity}
                    />
                </Grid>
            </Grid>
            <Grid order={{xs: 2, sm: 1}}>
                <ActivityAside activity={activity}/>
            </Grid>
        </Grid>
    );
};

export default ActivityDetails;
