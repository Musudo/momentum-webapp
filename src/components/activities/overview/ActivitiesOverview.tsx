import React, {SyntheticEvent, useRef, useState} from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
    Autocomplete,
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
    TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useTranslation} from "react-i18next";
import {SpeedDialDirectionsEnum,} from "../../../types/enums/ComponentPropsEnums";
import {IInstitution} from "../../../types/models/IInstitution";
import {ArchivedActivitiesYearPicker} from "./ArchivedActivitiesYearPicker";
import {useQuery} from "@tanstack/react-query";
import {fetchActivity} from "../../../utils/axios/configs/activityAxios";
import ArchivedActivityCard from "./ArchivedActivityCard";
import {IActivity} from "../../../types/models/IActivity";
import ActivitiesColumn from "./ActivitiesColumn";
import ActivitySpeedDial from "./ActivitySpeedDial";
import {fetchInstitution} from "../../../utils/axios/configs/institutionAxios.ts";

const ActivitiesOverview = () => {
    const [institutionName, setInstitutionName] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [isArchived, setIsArchived] = useState(false);
    const {t} = useTranslation();
    const options = ["Earliest first", "Latest first"];
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [archivedYear, setArchivedYear] = useState<Date | null>(new Date());

    const {
        data: institutions,
    } = useQuery<IInstitution[]>({
        queryKey: ["institutions"],
        queryFn: async () => {
            const res = await fetchInstitution.get("");
            return res.data;
        }
    });

    const {data: activitiesToday} = useQuery<IActivity[]>({
        queryKey: ["activitiesToday", institutionName],
        queryFn: async () => {
            const res = await fetchActivity.get("/today");
            if (institutionName) {
                return res.data.filter((activity) => activity.institution.name === institutionName)
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
                return res.data.filter((activity) => activity.institution.name === institutionName)
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
                return res.data.filter((activity) => activity.institution.name === institutionName)
            }
            return res.data;
        },
    });

    const {
        data: archivedActivities,
    } = useQuery<IActivity[]>({
        queryKey: ["archivedActivities", institutionName],
        queryFn: async () => {
            const res = await fetchActivity.get("/archived");
            if (institutionName) {
                return res.data.filter((activity) => activity.institution.name === institutionName)
            }
            return res.data;

        },
        enabled: isArchived
    });

    if (!activitiesToday || !activitiesNextSevenDays || !activitiesNextThirtyDays || !institutions) {
        return <div>Error</div>;
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

    // console.log("-->", institutionName);

    return (
        <Container
            sx={{
                flexGrow: 1,
                overflow: "auto",
                py: 2,
            }}
            maxWidth="lg"
        >
            <>
                <Grid
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1em",
                    }}
                >
                    <Box display="flex" flexDirection="row" width="90vh">
                        <FormControl style={{width: 300}}>
                            <Autocomplete
                                value={institutionName}
                                onChange={(event: SyntheticEvent, newValue: string | null) => {
                                    setInstitutionName(newValue);
                                }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                options={institutions.map((institution: IInstitutionn) => institution.name)}
                                // sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} size="small"
                                                                    label="Filter by institution"/>}
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
                                        onChange={() => setIsArchived((current) => !current)}
                                    />
                                }
                                label={t("Activities overview page.Show archived")}
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
                                            <ClickAwayListener onClickAway={() => {
                                                // if (anchorRef.current && anchorRef.current.contains(event.target)) return;
                                                setOpen(false);
                                            }}>
                                                <MenuList id="button-menu" autoFocusItem>
                                                    {options.map((option: string, index: number) => (
                                                        <MenuItem
                                                            key={option}
                                                            onClick={() =>
                                                                handleSortButton(index, option)
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
                                    handleArchivedYearChange={(newValue) => setArchivedYear(newValue)}
                                />
                            </Grid>
                            <Grid display="flex" flexWrap="wrap" width="100%" gap={2}>
                                {archivedActivities && archivedActivities.map((activity: IActivity) => (
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
                                    columnName={t("Activities overview page.Today")}
                                />
                            }
                            {
                                <ActivitiesColumn
                                    activities={activitiesNextSevenDays}
                                    columnName={t("Activities overview page.Next 7 days")}
                                />
                            }
                            {
                                <ActivitiesColumn
                                    activities={activitiesNextThirtyDays}
                                    columnName={t("Activities overview page.Next 30 days")}
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
