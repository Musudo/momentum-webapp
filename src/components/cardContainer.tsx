import {styled} from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import {CSSProperties} from "react";

type TCardContainerProps = {
    customStyles?: CSSProperties;
}

export const CardContainer = styled(MuiCard, {
    // Prevent `customStyles` from being forwarded to the DOM
    shouldForwardProp: (prop) => prop !== 'customStyles',
})<TCardContainerProps>(({theme, customStyles}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    borderRadius: theme.shape.borderRadius * 4,
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '550px',
    },
    // For mobile screens (down from 'sm') use full viewport width
    [theme.breakpoints.down('sm')]: {
        width: '100vw',
    },
    ...theme.applyStyles('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
    ...customStyles,
}));
