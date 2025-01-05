import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { NavbarTypesEnum } from "../../types/enums/ComponentPropsEnums";
import { unCapitalizeFirstLetter } from "../../utils/StringFormatterUtil";
import ReleaseVersion from "./ReleaseVersion";

type TProps = {
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
  navItems: string[];
};

const CustomDrawer = (props: TProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="temporary"
      open={props.mobileOpen}
      onClose={props.handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
      }}
    >
      <Box onClick={props.handleDrawerToggle} sx={{ textAlign: "center" }}>
        <Box sx={{ my: 2 }}>
          <Typography variant="h6">Momentum</Typography>
          <Box display="flex" justifyContent="center">
            <ReleaseVersion type={NavbarTypesEnum.Drawer} />
          </Box>
        </Box>
        <Divider />
        <List>
          {props.navItems.map((item: string, index: number) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => navigate("/" + unCapitalizeFirstLetter(item))}
              >
                <ListItemText primary={t("Common." + `${item}`)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;
