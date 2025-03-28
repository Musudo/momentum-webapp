import {styled} from '@mui/material/styles';
import MuiDrawer, {drawerClasses} from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import SelectContent from "./SelectContent.tsx";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import {setDashboardRouting, TDashboardRouting} from "../../../redux/slice/dashboardRoutingSlice.ts";
import {normalizeString} from "../../../utils/stringHelpers.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store.ts";
import {useState} from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TableChartIcon from "@mui/icons-material/TableChart";
// import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
// import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HiveIcon from '@mui/icons-material/Hive';

const mainListItems = [
    {name: 'Home', icon: <HomeRoundedIcon/>},
    {name: 'Data Grid', icon: <TableChartIcon/>},
    {name: 'Misc', icon: <HiveIcon/>},
];

// const secondaryListItems = [
//     {name: 'Settings', icon: <SettingsRoundedIcon/>},
//     {name: 'About', icon: <InfoRoundedIcon/>},
// ];

const drawerWidth = 240;
const navHeight = 'var(--template-frame-height, 45px)';

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

const SideMenu = () => {
    const dashboardRouting = useSelector((state: RootState) => state.dashboardRouting);
    const dispatch = useDispatch();
    const [selectedView, setSelectedView] = useState<string | null>(null);

    const changeDashboardRouteVisibility = (componentName: string) => {
        const updatedRouting: TDashboardRouting[] = dashboardRouting.map(route => {
            if (normalizeString(route.name, "view") === normalizeString(componentName) ||
                normalizeString(route.name, "view") === normalizeString(componentName, "Grid")) {
                return {...route, isVisible: true};
            } else {
                return {...route, isVisible: false};
            }
        });
        dispatch(setDashboardRouting(updatedRouting));
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                display: {xs: 'none', md: 'block'},
                top: navHeight,
                height: `calc(100% - ${navHeight})`,
                zIndex: (theme) => theme.zIndex.appBar - 1,
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: 'background.paper',
                    top: navHeight,
                    height: `calc(100% - ${navHeight})`,
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    // mt: 'calc(var(--template-frame-height, 60px) + 4px)',
                    p: 1.5,
                }}
            >
                <SelectContent/>
            </Box>
            <Divider/>
            <Box
                sx={{
                    overflow: 'auto',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Stack sx={{flexGrow: 1, p: 1, justifyContent: 'space-between'}}>
                    <List dense>
                        {mainListItems.map((item, index) => (
                            <ListItem key={index} disablePadding sx={{display: 'block'}}>
                                <ListItemButton
                                    selected={selectedView === item.name}
                                    onClick={() => {
                                        changeDashboardRouteVisibility(item.name);
                                        setSelectedView(item.name);
                                    }}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.name}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <List dense>
                        {/*{secondaryListItems.map((item, index) => (
                            <ListItem key={index} disablePadding sx={{display: 'block'}}>
                                <ListItemButton selected={selectedView === item.name} onClick={() => {
                                    changeDashboardRouteVisibility(item.name);
                                    setSelectedView(item.name);
                                }}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.name}/>
                                </ListItemButton>
                            </ListItem>
                        ))}*/}
                    </List>
                </Stack>
            </Box>
        </Drawer>
    );
}

export default SideMenu;