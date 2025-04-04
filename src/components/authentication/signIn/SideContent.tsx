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
                This is demo application created using
                <span style={{display: 'inline-block', alignItems: 'center', margin: '0 4px'}}>{<SiReact/>} React</span>
                and
                <span style={{display: 'inline-block', alignItems: 'center', margin: '0 4px'}}>{<SiSpringboot/>} Spring Boot</span>.
            </>
    },
    {
        icon: <ConstructionRoundedIcon sx={{color: 'text.secondary'}}/>,
        title: 'Work in progress',
        description:
            'The application is not fully ready. There can be bugs or some features might be not fully implemented.',
    },
    {
        icon: <ManageAccountsIcon sx={{color: 'text.secondary'}}/>,
        title: 'Try it out as a guest user',
        description:
            <>
                If you want to have a brief introduction you can use guest user email (<strong>guest@email.com</strong>)
                and password (<strong>1Password</strong>) to sign in. You will then have fake data and all the
                functionality of the app at your disposal.
            </>
    },
    {
        icon: <FlagIcon sx={{color: 'text.secondary'}}/>,
        title: 'Create your own account',
        description:
            <>
                You can as well sign up and create your personal account and begin to use the app for your normal stuff.
                But keep in mind that this is still only a demo app and not everything will work as expected.
            </>
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