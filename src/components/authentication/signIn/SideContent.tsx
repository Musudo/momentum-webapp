import {MomentumIcon} from './CustomIcons';
import {Box, Stack, Typography} from '@mui/material';
import EmergencyIcon from '@mui/icons-material/Emergency';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {SiReact, SiSpringboot} from 'react-icons/si';
import PreviewIcon from '@mui/icons-material/Preview';

const items = [
    {
        icon: <EmergencyIcon sx={{color: 'text.secondary'}}/>,
        title: 'Welcome to Momentum',
        description:
            <>
                A personal productivity app built with
                <span style={{display: 'inline-block', alignItems: 'center', margin: '0 4px'}}>{<SiReact/>} <b>React</b></span>
                and
                <span style={{display: 'inline-block', alignItems: 'center', margin: '0 4px'}}>{<SiSpringboot/>} <b>Spring Boot</b></span>
                — currently in active development.
            </>
    },
    {
        icon: <PreviewIcon sx={{color: 'text.secondary'}}/>,
        title: 'Try it instantly as a guest',
        description:
            <>
                Use the guest account to explore all core features with fake data:
                <ul style={{marginBottom: -2}}>
                    <li><b>Username</b>: guest@email.com</li>
                    <li><b>Password</b>: 1Password</li>
                </ul>
            </>,
    },
    {
        icon: <ManageAccountsIcon sx={{color: 'text.secondary'}}/>,
        title: 'Or create your own account',
        description:
            <>
                Sign up to try it out with your own data.
                This version is still evolving, so you may encounter the occasional issues — feedback is welcome!
                <br/>
                <br/>
                <span style={{fontSize: 20}}>🚧 </span>
                <b>This project is a work-in-progress and not ready for production use.</b>
                <span style={{fontSize: 20}}> 🚧</span>
            </>
    },
];

const SideContent = () => {

    return (
        <Stack
            sx={{flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450}}
        >
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                <MomentumIcon height={30} width={160}/>
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