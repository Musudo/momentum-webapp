import {styled} from '@mui/material/styles';
import MuiDrawer, {drawerClasses} from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuContent from './MenuContent.tsx';
import SelectContent from "./SelectContent.tsx";

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
                <MenuContent/>
            </Box>
        </Drawer>
    );
}

export default SideMenu;