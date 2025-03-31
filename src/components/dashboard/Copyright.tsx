import Link from '@mui/material/Link';
import Typography, {TypographyProps} from '@mui/material/Typography';
import {MomentumIcon} from "../authentication/signIn/CustomIcons.tsx";
import {Box} from "@mui/material";

const Copyright = (props: TypographyProps) => {
    return (
        <Typography
            component="div"
            variant="body2"
            align="center"
            {...props}
            sx={[
                {
                    color: 'text.secondary',
                },
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        >
            <Box mb={2}>
                <MomentumIcon/>
            </Box>
            <Box>
                {'Copyright © '}
                <Link color="inherit" href="#">
                    Momentum App
                </Link>{' '}{new Date().getFullYear()}{'.'}
            </Box>
        </Typography>
    );
}

export default Copyright;