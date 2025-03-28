import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SideMenu from "./sideMenu/SideMenu.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {componentMapper} from "../../utils/mappers/componentMapper.ts";
import Copyright from "./Copyright.tsx";

const Dashboard = () => {
    const dashboardRouting = useSelector((state: RootState) => state.dashboardRouting);

    return (
        <Box sx={{display: 'flex'}}>
            {/*TODO: consider creating solid navbar+side for dashboard only*/}
            <SideMenu/>
            <Box
                component="main"
                sx={() => ({
                    flexGrow: 1,
                    overflow: 'auto',
                })}
            >
                <Stack
                    spacing={2}
                    sx={{
                        alignItems: 'center',
                        mx: 3,
                        pb: 5,
                        mt: {xs: 8, md: 0},
                    }}
                >
                    {dashboardRouting.map((route) => {
                        if (!route.isVisible) return null;
                        const Component = componentMapper[route.name];
                        return Component ? <Component key={route.name}/> : null;
                    })}
                </Stack>
                <Copyright/>
            </Box>
        </Box>
    );
}

export default Dashboard;