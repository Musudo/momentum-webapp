import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import TableChartIcon from '@mui/icons-material/TableChart';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import {useDispatch, useSelector} from "react-redux";
import {setDashboardRouting, TDashboardRouting} from "../../../redux/slice/dashboardRoutingSlice.ts";
import {RootState} from "../../../redux/store.ts";
import {useState} from "react";
import {normalizeString} from "../../../utils/stringHelpers.ts";

const mainListItems = [
    {name: 'Home', icon: <HomeRoundedIcon/>},
    {name: 'Data', icon: <TableChartIcon/>},
    {name: 'Tasks', icon: <AssignmentRoundedIcon/>},
    {name: 'Voice memos', icon: <VoicemailIcon/>},
];

const secondaryListItems = [
    {name: 'Settings', icon: <SettingsRoundedIcon/>},
    {name: 'About', icon: <InfoRoundedIcon/>},
];

const MenuContent = () => {
    const dashboardRouting = useSelector((state: RootState) => state.dashboardRouting);
    const dispatch = useDispatch();
    const [selectedView, setSelectedView] = useState<string | null>(null);

    const changeDashboardRouteVisibility = (componentName: string) => {
        const updatedRouting: TDashboardRouting[] = dashboardRouting.map(route => {
            if (normalizeString(route.name, "view") === normalizeString(componentName)) {
                return {...route, isVisible: true};
            } else {
                return {...route, isVisible: false};
            }
        });
        dispatch(setDashboardRouting(updatedRouting));
    };

    return (
        <Stack sx={{flexGrow: 1, p: 1, justifyContent: 'space-between'}}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton selected={selectedView === item.name} onClick={() => {
                            changeDashboardRouteVisibility(item.name);
                            setSelectedView(item.name);
                        }}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton selected={selectedView === item.name} onClick={() => {
                            changeDashboardRouteVisibility(item.name);
                            setSelectedView(item.name);
                        }}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}

export default MenuContent;