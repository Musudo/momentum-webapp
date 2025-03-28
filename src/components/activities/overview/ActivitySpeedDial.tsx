import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PeopleIcon from "@mui/icons-material/People";
import {
    Box,
    ClickAwayListener,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {ActivityTypesEnum} from "../../../types/enums/ActivityTypesEnum";
import {SpeedDialDirectionsEnum} from "../../../types/enums/ComponentPropsEnums";

type TActivitySpeedDialProps = {
    direction: SpeedDialDirectionsEnum | undefined;
};

const actions = [
    {icon: <PeopleIcon/>, name: ActivityTypesEnum.Physical},
    {icon: <ConnectWithoutContactIcon/>, name: ActivityTypesEnum.Online},
    {icon: <LocalPhoneIcon/>, name: ActivityTypesEnum.Phone},
];

const ActivitySpeedDial = ({direction}: TActivitySpeedDialProps) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            sx={{
                transform: "translateZ(0)",
                flexGrow: 1,
            }}
        >
            <ClickAwayListener onClickAway={() => setOpen(false)}>
                <SpeedDial
                    ariaLabel="Activity speed dial"
                    color="inherit"
                    sx={{position: "absolute", bottom: 6, right: 6}}
                    icon={<SpeedDialIcon/>}
                    direction={direction}
                    onClick={() => setOpen(!open)}
                    open={open}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={
                                !isMobile ? t(`Common.Activity speed dial.${action.name}`) : ""
                            }
                            onClick={() => navigate(`/activities/create/${action.name}`)}
                        />
                    ))}
                </SpeedDial>
            </ClickAwayListener>
        </Box>
    );
};

export default ActivitySpeedDial;
