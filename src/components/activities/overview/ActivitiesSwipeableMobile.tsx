import * as React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IActivity } from "../../../types/models/IActivity";
import { useTranslation } from "react-i18next";
import { allyProps } from "../../../props/MUIElementProps";
import ActivitiesColumn from "./ActivitiesColumn";
import SwipeableViews from "react-swipeable-views";

type TProps = {
  activitiesToday: IActivity[];
  activitiesNextSevenDays: IActivity[];
  activitiesNextThirtyDays: IActivity[];
};

type TTabPanelProps = {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
};

const TabPanel = (props: TTabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
};

const ActivitiesSwipeableMobile = (props: TProps) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();

  const handleChange = (event: unknown, newValue: number) => setValue(newValue);

  const handleChangeIndex = (index: number) => setValue(index);

  return (
    <Box
      sx={{
        bgcolor: "#eaeaee",
        width: "100%",
        position: "relative",
        minHeight: 200,
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label={t("Activities overview page.Today")} {...allyProps(0)} />
          <Tab
            label={t("Activities overview page.Next 7 days")}
            {...allyProps(1)}
          />
          <Tab
            label={t("Activities overview page.Next 30 days")}
            {...allyProps(2)}
          />
        </Tabs>
      </AppBar>
      {/* TODO: fix this error */}
      <SwipeableViews
        index={value}
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ActivitiesColumn
            activities={props.activitiesToday}
            columnName={null}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ActivitiesColumn
            activities={props.activitiesNextSevenDays}
            columnName={null}
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <ActivitiesColumn
            activities={props.activitiesNextThirtyDays}
            columnName={null}
          />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
};

export default ActivitiesSwipeableMobile;
