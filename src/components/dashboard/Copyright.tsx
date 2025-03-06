import Link from '@mui/material/Link';
import Typography, {TypographyProps} from '@mui/material/Typography';

const Copyright = (props: TypographyProps) => {
    return (
        <Typography
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
            {'Copyright © '}
            <Link color="inherit" href="#">
                Momentum App
            </Link>{' '}{new Date().getFullYear()}{'.'}
        </Typography>
    );
}

export default Copyright;