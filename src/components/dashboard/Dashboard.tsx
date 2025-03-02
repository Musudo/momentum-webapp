import {alpha} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SideMenu from "./sideMenu/SideMenu.tsx";
import {Navbar} from "../navbar/Navbar.tsx";
import AppBar from "@mui/material/AppBar/AppBar";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {componentMapper} from "../../utils/mappers/componentMapper.ts";
import Copyright from "./Copyright.tsx";

const Dashboard = () => {
    const dashboardRouting = useSelector((state: RootState) => state.dashboardRouting);

    return (
        <>
            <CssBaseline enableColorScheme/>
            <Box sx={{display: 'flex'}}>
                <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <Navbar/>
                </AppBar>
                <SideMenu/>
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: alpha(theme.palette.background.default, 1),
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
                        <Copyright sx={{ my: 8 }} />
                    </Stack>
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;