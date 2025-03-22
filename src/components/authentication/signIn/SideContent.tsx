import {MomentumIcon} from './CustomIcons';
import {Box, Stack, Typography} from '@mui/material';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import EmergencyIcon from '@mui/icons-material/Emergency';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FlagIcon from '@mui/icons-material/Flag';
import {SiReact, SiSpringboot} from 'react-icons/si';

const items = [
    {
        icon: <EmergencyIcon sx={{color: 'text.secondary'}}/>,
        title: 'Demo web application',
        description:
            <>
                This demo application is designed to give a look into capabilities
                of <span style={{display: 'inline-block', alignItems: 'center', margin: '0 4px'}}>{
                <SiReact/>} React</span>
                and <span style={{display: 'inline-block', alignItems: 'center', margin: '0 4px'}}>{
                <SiSpringboot/>} Spring Boot</span>.
            </>
    },
    {
        icon: <ConstructionRoundedIcon sx={{color: 'text.secondary'}}/>,
        title: 'Work in progress',
        description:
            'The application is not fully ready yet. There can be bugs or some features might be not fully finished yet.',
    },
    {
        icon: <ManageAccountsIcon sx={{color: 'text.secondary'}}/>,
        title: 'Try it out as a guest user',
        description:
            <>
                If you just want to have a brief introduction you can use guest user username (<strong>guest</strong>)
                and password (<strong>1Password</strong>) to sign in. You will then have fake data and all the
                functionality of the app at your disposal.
            </>
    },
    {
        icon: <FlagIcon sx={{color: 'text.secondary'}}/>,
        title: 'Create your own account',
        description:
            'You can as well sign up and create your personal account and begin to use the app for your normal stuff.',
    },
];

const SideContent = () => {

    return (
        <Stack
            sx={{flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450}}
        >
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                <MomentumIcon/>
            </Box>
            {items.map((item, index) => (
                <Stack key={index} direction="row" sx={{gap: 2}}>
                    {item.icon}
                    <div>
                        <Typography gutterBottom sx={{fontWeight: 'medium'}}>
                            {item.title}
                        </Typography>
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                            {item.description}
                        </Typography>
                    </div>
                </Stack>
            ))}
        </Stack>
    );
}

export default SideContent;