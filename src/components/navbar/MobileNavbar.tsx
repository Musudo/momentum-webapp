import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ActivitySpeedDial from "../activities/overview/ActivitySpeedDial.tsx";
import {SpeedDialDirectionsEnum} from "../../types/enums/ComponentPropsEnums.ts";
import {UserMenu} from "./Navbar.tsx";
import MobileDrawer from "./MobileDrawer.tsx";
import {useState} from "react";

const MobileNavbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navItems = ["Dashboard", "Activities", "Contacts"];

    return (
        <Box component="nav" sx={{flexGrow: 1}}>
            <AppBar position="fixed" sx={{top: 'auto', bottom: 0}}>
                <Toolbar variant="dense">
                    <Box flex={1} display="flex" justifyContent="space-between">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Box
                            sx={{
                                position: 'absolute',
                                zIndex: 1,
                                top: -30,
                                left: 0,
                                right: 0,
                                margin: '0 auto',
                            }}
                        >
                            <ActivitySpeedDial direction={SpeedDialDirectionsEnum.Up}/>
                        </Box>
                        <UserMenu/>
                    </Box>
                </Toolbar>
            </AppBar>
            <MobileDrawer
                mobileOpen={mobileOpen}
                handleDrawerToggle={() => setMobileOpen(!mobileOpen)}
                navItems={navItems}
            />
        </Box>
    )
}

export default MobileNavbar;