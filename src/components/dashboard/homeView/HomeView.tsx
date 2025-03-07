import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StatCard, {TStatCardProps} from './statCard.tsx';
import {useQuery} from "@tanstack/react-query";
import {fetchStat} from "../../../utils/axios/configs/statAxios.ts";
import BarChart from "./barChart.tsx";
import LineChart from './lineChart.tsx';

const HomeView = () => {

    const {
        data: activitiesStatCard,
    } = useQuery({
        queryKey: ["activitiesStatCard"],
        queryFn: async () => {
            const res = await fetchStat.get("/activities/last-month/amounts-per-day");
            return res.data;
        },
    });

    const {
        data: tasksStatCard,
    } = useQuery({
        queryKey: ["tasksStatCard"],
        queryFn: async () => {
            const res = await fetchStat.get("/tasks/last-month/amounts-per-day");
            return res.data;
        },
    });

    const {
        data: reviewsStatCard,
    } = useQuery({
        queryKey: ["reviewsStatCard"],
        queryFn: async () => {
            const res = await fetchStat.get("/reviews/last-month/amounts-per-day");
            return res.data;
        },
    });

    const {
        data: activityTypesBarChart,
    } = useQuery({
        queryKey: ["activityTypesBarChart"],
        queryFn: async () => {
            const res = await fetchStat.get("/activities/last-six-months/amounts-per-month");
            return res.data;
        },
    });

    const {
        data: lineChartData,
    } = useQuery({
        queryKey: ["lineChartData"],
        queryFn: async () => {
            const res = await fetchStat.get("/line-chart-data/last-month/amounts-per-day");
            return res.data;
        },
    });

    if (!activitiesStatCard || !tasksStatCard || !reviewsStatCard || !activityTypesBarChart || !lineChartData) {
        return <div>Error</div>;
    }

    const statCards: TStatCardProps[] = [
        activitiesStatCard,
        tasksStatCard,
        reviewsStatCard
    ];

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
                {statCards.map((card, index) => (
                    <Grid key={index} size={{xs: 12, sm: 6, lg: 3}}>
                        <StatCard {...card} />
                    </Grid>
                ))}

                {/*<Grid size={{xs: 12, sm: 6, lg: 3}}>*/}
                {/*</Grid>*/}

                <Grid size={{xs: 12, md: 6}}>
                    <LineChart {...lineChartData} />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <BarChart {...activityTypesBarChart} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default HomeView;