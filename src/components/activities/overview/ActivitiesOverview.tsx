import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
    Box,
    Button,
    ButtonGroup,
    ClickAwayListener,
    Container,
    FormControl,
    FormControlLabel,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Switch,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {ActivityColumnsEnum, SpeedDialDirectionsEnum,} from "../../../types/enums/ComponentPropsEnums";
import {IInstitution} from "../../../types/models/IInstitution";
import {ArchivedActivitiesYearPicker} from "./ArchivedActivitiesYearPicker";
import InstitutionSearchBar from "./InstitutionSearchBar";
import {useQuery} from "@tanstack/react-query";
import {fetchActivity} from "../../../utils/axios/configs/activityAxios";
import ArchivedActivityCard from "./ArchivedActivityCard";
import {IActivity} from "../../../types/models/IActivity";
import ActivitiesColumn from "./ActivitiesColumn";
import ActivitySpeedDial from "./ActivitySpeedDial";
import {Outlet} from "react-router-dom";
import {RootState} from "../../../redux/store";
import {useSelector} from "react-redux";

const ActivitiesOverview = () => {
    const [institution, setInstitution] = useState<IInstitution | null>(null);
    const [isArchived, setIsArchived] = useState(false);
    const {t} = useTranslation();
    const user = useSelector((state: RootState) => state.user);

    /* sort button */
    const options = ["Earliest first", "Latest first"];
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const handleSortButtonClick = (event: unknown, index: number) => {
        if (selectedIndex !== index) {
            setSelectedIndex(index);
            setOpen(false);
            //   sortActivitiesByDate();
        }
    };
    const handleSortButtonOpen = () => setOpen((prevOpen: boolean) => !prevOpen);
    const handleSortButtonClose = (event: unknown) => {
        // if (anchorRef.current && anchorRef.current.contains(event.target)) return;
        setOpen(false);
    };
    /* sort button */

    /* archive button */
    const [archivedYear, setArchivedYear] = useState<Date | null>(new Date());
    const handleArchivedYearChange = (newValue: Date | null) =>
        setArchivedYear(newValue);
    /* archive button */

    const {
        data: activitiesToday,
    } = useQuery({
        queryKey: ["activitiesToday"],
        queryFn: async () => {
            const res = await fetchActivity.get("/today");
            return res.data;
        },
    });

    const {
        data: activitiesNextSevenDays,
    } = useQuery({
        queryKey: ["activitiesNextSevenDays"],
        queryFn: async () => {
            const res = await fetchActivity.get("/next-seven-days");
            return res.data;
        },
    });

    const {
        data: activitiesNextThirtyDays,
    } = useQuery({
        queryKey: ["activitiesNextThirtyDays"],
        queryFn: async () => {
            const res = await fetchActivity.get("/next-thirty-days");
            return res.data;
        },
    });

    const {
        data: archivedActivities,
    } = useQuery({
        queryKey: ["archivedActivities"],
        queryFn: async () => {
            const res = await fetchActivity.get("/archived");
            return res.data;
        },
    });

    if (!activitiesToday || !activitiesNextSevenDays || !activitiesNextThirtyDays || !archivedActivities) {
        return <div>Error</div>;
    }

    // console.log("test", activities)

    const handleArchivedActivitiesSwitchChange = () =>
        setIsArchived((current) => !current);

    return (
        <Container
            sx={{
                flexGrow: 1,
                overflow: "auto",
                py: 2,
            }}
            maxWidth="lg"
        >
            <Outlet/>
            <>
                <Grid
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1em",
                    }}
                >
                    <Box display="flex" flexDirection="row" width="90vh">
                        <FormControl sx={{width: 250}}>
                            <InstitutionSearchBar
                                setInstitution={setInstitution}
                                institution={institution}
                                setContacts={null}
                                setValue={null}
                            />
                        </FormControl>
                        <FormControl
                            component="fieldset"
                            variant="standard"
                            sx={{ml: 2}}
                        >
                            <FormControlLabel
                                sx={{width: 240}}
                                control={
                                    <Switch
                                        checked={isArchived}
                                        name="archive"
                                        onChange={handleArchivedActivitiesSwitchChange}
                                    />
                                }
                                label={t("Activities overview page.Show archived activities")}
                            />
                        </FormControl>
                        <Box sx={{width: 300, ml: 1}}>
                            <ButtonGroup
                                variant="text"
                                ref={anchorRef}
                                aria-label="sort button"
                            >
                                <Button
                                    aria-controls="button-menu"
                                    aria-expanded="true"
                                    aria-label="sort button"
                                    aria-haspopup="menu"
                                    startIcon={<FilterListIcon/>}
                                    endIcon={<ArrowDropDownIcon/>}
                                    onClick={handleSortButtonOpen}
                                >
                                    {t(`Activities overview page.${options[selectedIndex]}`)}
                                </Button>
                            </ButtonGroup>
                            <Popper
                                sx={{zIndex: 1}}
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                transition
                                disablePortal
                            >
                                {({TransitionProps, placement}) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === "bottom"
                                                    ? "center top"
                                                    : "center bottom",
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleSortButtonClose}>
                                                <MenuList id="button-menu" autoFocusItem>
                                                    {options.map((option: string, index: number) => (
                                                        <MenuItem
                                                            key={option}
                                                            selected={index === selectedIndex}
                                                            onClick={(event) =>
                                                                handleSortButtonClick(event, index)
                                                            }
                                                        >
                                                            {t(`Activities overview page.${option}`)}
                                                        </MenuItem>
                                                    ))}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Box>
                    </Box>
                    <Box mt={7}>
                        <ActivitySpeedDial direction={SpeedDialDirectionsEnum.Left}/>
                    </Box>
                </Grid>
                <Paper elevation={0} sx={{py: 2, px: 2, bgcolor: "#eaeaee"}}>
                    {isArchived ? (
                        <Grid container spacing={2}>
                            <Grid>
                                <ArchivedActivitiesYearPicker
                                    archivedYear={archivedYear}
                                    handleArchivedYearChange={handleArchivedYearChange}
                                />
                            </Grid>
                            <Grid display="flex" flexWrap="wrap" width="100%" gap={2}>
                                {archivedActivities.map((activity: IActivity) => (
                                    <ArchivedActivityCard activity={activity}/>
                                ))}
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid
                            container
                            display="flex"
                            justifyContent="space-around"
                            spacing={{xs: 1, sm: 2, md: 3}}
                        >
                            {
                                <ActivitiesColumn
                                    activities={activitiesToday}
                                    columnName={
                                        t(
                                            "Activities overview page.Today"
                                        ) as ActivityColumnsEnum.Today
                                    }
                                />
                            }
                            {
                                <ActivitiesColumn
                                    activities={activitiesNextSevenDays}
                                    columnName={
                                        t(
                                            "Activities overview page.Next 7 days"
                                        ) as ActivityColumnsEnum.Next_7_Days
                                    }
                                />
                            }
                            {
                                <ActivitiesColumn
                                    activities={activitiesNextThirtyDays}
                                    columnName={
                                        t(
                                            "Activities overview page.Next 30 days"
                                        ) as ActivityColumnsEnum.Next_30_Days
                                    }
                                />
                            }
                        </Grid>
                    )}
                </Paper>
            </>
        </Container>
    );
};

export default ActivitiesOverview;
