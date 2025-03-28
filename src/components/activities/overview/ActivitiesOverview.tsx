import * as React from "react";
import {useRef, useState} from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
    Box,
    Button,
    ButtonGroup,
    ClickAwayListener,
    FormControl,
    FormControlLabel,
    Grow,
    IconButton,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Switch,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useTranslation} from "react-i18next";
import {SpeedDialDirectionsEnum,} from "../../../types/enums/ComponentPropsEnums";
import {useQuery} from "@tanstack/react-query";
import {fetchActivity} from "../../../utils/axios/configs/activityAxios";
import ArchivedActivityCard from "./ArchivedActivityCard";
import {IActivity} from "../../../types/models/IActivity";
import ActivitiesColumn from "./ActivitiesColumn";
import ActivitySpeedDial from "./ActivitySpeedDial";
import ArchivedActivitiesYearPicker from "./ArchivedActivitiesYearPicker.tsx";
import InstitutionFilter from "../InstitutionFilter.tsx";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ActivityCard from "./ActivityCard.tsx";
import {CardContainer} from "../../cardContainer.tsx";

type TMobileTabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const CustomMobileTabPanel = (props: TMobileTabPanelProps) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const a11yMobileTabProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ActivitiesOverview = () => {
    const [institutionName, setInstitutionName] = useState<string | null>(null);
    const [isArchived, setIsArchived] = useState(false);
    const {t} = useTranslation();
    const options = ["Earliest first", "Latest first"];
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [archivedYear, setArchivedYear] = useState<string | null>(new Date().getFullYear().toString());
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [mobileTabValue, setMobileTabValue] = useState(0);

    const {data: activitiesToday} = useQuery<IActivity[]>({
        queryKey: ["activitiesToday", institutionName],
        queryFn: async () => {
            const res = await fetchActivity.get("/today");
            if (institutionName) {
                return res.data.filter((activity: IActivity) => activity.institution.name === institutionName)
            }
            return res.data;
        }
    });

    const {
        data: activitiesNextSevenDays,
    } = useQuery<IActivity[]>({
        queryKey: ["activitiesNextSevenDays", institutionName],
        queryFn: async () => {
            const res = await fetchActivity.get("/next-seven-days");
            if (institutionName) {
                return res.data.filter((activity: IActivity) => activity.institution.name === institutionName)
            }
            return res.data;
        },
    });

    const {
        data: activitiesNextThirtyDays,
    } = useQuery<IActivity[]>({
        queryKey: ["activitiesNextThirtyDays", institutionName],
        queryFn: async () => {
            const res = await fetchActivity.get("/next-thirty-days");
            if (institutionName) {
                return res.data.filter((activity: IActivity) => activity.institution.name === institutionName)
            }
            return res.data;
        },
    });

    const {
        data: archivedActivities,
    } = useQuery<IActivity[]>({
        queryKey: ["archivedActivities", archivedYear, institutionName],
        queryFn: async () => {
            const res = await fetchActivity.get(`/archived/${archivedYear}`);
            if (institutionName) {
                return res.data.filter((activity: IActivity) => activity.institution.name === institutionName)
            }
            return res.data;

        },
        enabled: isArchived
    });

    if (!activitiesToday || !activitiesNextSevenDays || !activitiesNextThirtyDays) {
        return <div>Error</div>;
    }
    const handleSortButtonMobile = () => {
        setSelectedIndex(selectedIndex === 1 ? 0 : 1);

        if (isArchived && archivedActivities) {
            // this should do the job for now, think of making both sorts conform in the future
            archivedActivities.sort().reverse();
        } else {
            // this should do the job for now, think of making both sorts conform in the future
            activitiesToday.sort().reverse();
            activitiesNextSevenDays.sort().reverse();
            activitiesNextThirtyDays.sort().reverse();
        }
    }

    const handleSortButton = (index: number, option: string) => {
        if (selectedIndex !== index) {
            setSelectedIndex(index);
            setOpen(false);
        }

        if (isArchived && archivedActivities) {
            archivedActivities.sort((a, b) => {
                const timeA = new Date(a.startTime).getTime();
                const timeB = new Date(b.startTime).getTime();

                // Sort by "earliest" or "latest"
                return option === "Earliest first" ? timeA - timeB : timeB - timeA;
            });
        } else {
            activitiesToday.sort((a, b) => {
                const timeA = new Date(a.startTime).getTime();
                const timeB = new Date(b.startTime).getTime();

                // Sort by "earliest" or "latest"
                return option === "Earliest first" ? timeA - timeB : timeB - timeA;
            });

            activitiesNextSevenDays.sort((a, b) => {
                const timeA = new Date(a.startTime).getTime();
                const timeB = new Date(b.startTime).getTime();

                // Sort by "earliest" or "latest"
                return option === "Earliest first" ? timeA - timeB : timeB - timeA;
            });

            activitiesNextThirtyDays.sort((a, b) => {
                const timeA = new Date(a.startTime).getTime();
                const timeB = new Date(b.startTime).getTime();

                // Sort by "earliest" or "latest"
                return option === "Earliest first" ? timeA - timeB : timeB - timeA;
            });
        }
    };

    return (
        <Grid>
            {isMobile ? (
                <>
                    <FormControl style={{width: '100%'}}>
                        <InstitutionFilter institutionName={institutionName}
                                           setInstitutionName={setInstitutionName}/>
                    </FormControl>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <FormControl>
                            <IconButton
                                aria-label="sort button"
                                onClick={() => handleSortButtonMobile()}
                            >
                                <FilterListIcon/>
                            </IconButton>
                        </FormControl>
                        <FormControl
                            component="fieldset"
                            variant="standard"
                            sx={{ml: 2}}
                        >
                            <FormControlLabel
                                sx={{width: 150}}
                                control={
                                    <Switch
                                        checked={isArchived}
                                        name="archive"
                                        onChange={() => setIsArchived((current) => !current)}
                                    />
                                }
                                label={t("Activities overview page.Show archived")}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{width: '100%'}}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            borderBottom: 1,
                            borderColor: 'divider'
                        }}>
                            <Tabs value={mobileTabValue}
                                  aria-label="basic tabs example"
                                  onChange={(_event, newValue) => setMobileTabValue(newValue)}
                            >
                                {activitiesToday.length > 0 && <Tab label="Today" {...a11yMobileTabProps(0)} />}
                                {activitiesNextSevenDays.length > 0 &&
                                    <Tab label="Next 7 days" {...a11yMobileTabProps(1)} />}
                                {activitiesNextThirtyDays.length > 0 &&
                                    <Tab label="Next 30 days" {...a11yMobileTabProps(2)} />}
                            </Tabs>
                        </Box>
                        {activitiesToday.length > 0 && (
                            <CustomMobileTabPanel value={mobileTabValue} index={0}>
                                {activitiesToday.map((activity, index) => (
                                    <ActivityCard key={index} activity={activity}/>
                                ))}
                            </CustomMobileTabPanel>
                        )}

                        <CustomMobileTabPanel value={mobileTabValue} index={1}>
                            {activitiesNextSevenDays.map((activity, index) => (
                                <ActivityCard key={index} activity={activity}/>
                            ))}
                        </CustomMobileTabPanel>
                        <CustomMobileTabPanel value={mobileTabValue} index={2}>
                            {activitiesNextThirtyDays.map((activity, index) => (
                                <ActivityCard key={index} activity={activity}/>
                            ))}
                        </CustomMobileTabPanel>
                    </Box>
                </>
            ) : (
                <>
                    <Grid
                        container
                        direction="row"
                        sx={{
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                        }}
                    >
                        <Box display="flex" flexDirection="row">
                            <FormControl style={{width: 300}}>
                                <InstitutionFilter institutionName={institutionName}
                                                   setInstitutionName={setInstitutionName}/>
                            </FormControl>
                            <FormControl
                                component="fieldset"
                                variant="standard"
                                sx={{ml: 2}}
                            >
                                <FormControlLabel
                                    sx={{width: 150}}
                                    control={
                                        <Switch
                                            checked={isArchived}
                                            name="archive"
                                            onChange={() => setIsArchived((current) => !current)}
                                        />
                                    }
                                    label={t("Activities overview page.Show archived")}
                                />
                            </FormControl>
                            <FormControl>
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
                                        onClick={() => setOpen((prevOpen: boolean) => !prevOpen)}
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
                                                <ClickAwayListener onClickAway={() => setOpen(false)}>
                                                    <MenuList id="button-menu" autoFocusItem>
                                                        {options.map((option: string, index: number) => (
                                                            <MenuItem
                                                                key={option}
                                                                onClick={() => handleSortButton(index, option)}>
                                                                {t(`Activities overview page.${option}`)}
                                                            </MenuItem>
                                                        ))}
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </FormControl>
                        </Box>
                        <Box sx={{
                            mt: {xs: 0, md: 6},
                            mb: {xs: 6, md: 0},
                        }}>
                            <ActivitySpeedDial direction={SpeedDialDirectionsEnum.Left}/>
                        </Box>
                    </Grid>
                    <CardContainer
                        sx={{
                            boxShadow: "none",
                            // border: 0,
                            [theme.breakpoints.up('sm')]: {
                                width: '100%',
                                height: '80vh',
                            },
                        }}
                    >
                        {isArchived ? (
                            <Grid container spacing={2}>
                                <Grid>
                                    <ArchivedActivitiesYearPicker
                                        archivedYear={archivedYear}
                                        setArchivedYear={(newValue) => setArchivedYear(newValue)}
                                    />
                                </Grid>
                                <Grid display="flex" flexWrap="wrap" width="100%" gap={2}>
                                    {archivedActivities && archivedActivities.map((activity: IActivity) => (
                                        <ArchivedActivityCard key={activity.id} activity={activity}/>
                                    ))}
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid
                                container
                                spacing={{xs: 2, md: 4}}
                                columns={{xs: 1, md: 3}}
                            >
                                {activitiesToday.length > 0 && (
                                    <ActivitiesColumn
                                        activities={activitiesToday}
                                        columnName={t("Activities overview page.Today")}
                                        isMobile={isMobile}
                                    />
                                )}
                                {activitiesNextSevenDays.length > 0 && (
                                    <ActivitiesColumn
                                        activities={activitiesNextSevenDays}
                                        columnName={t("Activities overview page.Next 7 days")}
                                        isMobile={isMobile}
                                    />
                                )}
                                {activitiesNextThirtyDays.length > 0 && (
                                    <ActivitiesColumn
                                        activities={activitiesNextThirtyDays}
                                        columnName={t("Activities overview page.Next 30 days")}
                                        isMobile={isMobile}
                                    />
                                )}
                            </Grid>
                        )}
                    </CardContainer>
                </>

            )}
        </Grid>
    );
};

export default ActivitiesOverview;
