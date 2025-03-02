import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HighlightedCard from './HighlightedCard.tsx';
import PageViewsBarChart from './PageViewsBarChart.tsx';
import SessionsChart from './SessionsChart.tsx';
import StatCard, {TStatCardProps} from './StatCard.tsx';
import {useQuery} from "@tanstack/react-query";
import {fetchActivity} from "../../../utils/axios/configs/activityAxios.ts";
import {mapMultipleEntities} from "../../../utils/mappers/genericMapper.ts";
import {
    mapActivitiesToStatCard,
    mapEmailsToStatCard,
    mapTasksToStatCard,
} from "../../../utils/mappers/entityMapper.ts";
import {fetchTask} from "../../../utils/axios/configs/taskAxios.ts";
import {fetchEmail} from "../../../utils/axios/configs/emailAxios.ts";

const defaultData: TStatCardProps[] = [];

const HomeView = () => {

    const {
        data: activities,
        status: activitiesStatus,
    } = useQuery({
        queryKey: ["activities"],
        queryFn: async () => {
            const res = await fetchActivity.get("/last30Days");
            return res.data;
        },
    });

    const {
        data: emails,
        status: emailsStatus,
    } = useQuery({
        queryKey: ["emails"],
        queryFn: async () => {
            const res = await fetchEmail.get("");
            return res.data;
        },
    });

    const {
        data: tasks,
        status: tasksStatus,
    } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const res = await fetchTask.get("/last30Days");
            return res.data;
        },
    });

    const statCardData: TStatCardProps[] = mapMultipleEntities({
        activitiesData: {
            data: activities ?? defaultData,
            mapper: mapActivitiesToStatCard,
        },
        emailsData: {
            data: emails ?? defaultData,
            mapper: mapEmailsToStatCard,
        },
        tasksData: {
            data: tasks ?? defaultData,
            mapper: mapTasksToStatCard,
        },
    });

    console.log(statCardData)

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            <Typography component="h2" variant="h5" sx={{mb: 2}}>
                Overview
            </Typography>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{mb: (theme) => theme.spacing(2)}}
            >
                {statCardData.map((card, index) => (
                    <Grid key={index} size={{xs: 12, sm: 6, lg: 3}}>
                        <StatCard {...card} />
                    </Grid>
                ))}
                <Grid size={{xs: 12, sm: 6, lg: 3}}>
                    <HighlightedCard/>
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <SessionsChart/>
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <PageViewsBarChart/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default HomeView;