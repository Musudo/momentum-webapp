import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import PublicIcon from "@mui/icons-material/Public";
import { Avatar, Tab, Tabs } from "@mui/material";
import AppBar from "@mui/material/AppBar/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { NavbarTypesEnum } from "../../types/enums/ComponentPropsEnums";
import { stringAvatar } from "../../utils/AvatarGeneratorUtil";
import { unCapitalizeFirstLetter } from "../../utils/StringFormatterUtil";
import CustomDrawer from "./CustomDrawer";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import ReleaseVersion from "./ReleaseVersion";
import Locales from "./Locales";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const user = useSelector((state: RootState) => state.user);

  /* drawer menu */
  const navItems = ["Dashboard", "Activities", "Contacts"];
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  /* drawer menu */

  /* locale menu */
  const localeMenuId = "primary-locale-menu";
  const [anchorElLocaleMenu, setAnchorElLocale] = useState<null | HTMLElement>(
    null
  );
  const handleLocaleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLocale(event.currentTarget);
  };
  const handleLocaleMenuClose = () => {
    setAnchorElLocale(null);
  };
  /* locale menu */

  /* profile icon and main menu */
  const mainMenuId = "primary-account-menu";
  const mobileMenuId = "primary-account-menu-mobile";
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const isMainMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMainMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  /* profile icon and main menu */

  /* nav tabs highlighting */
  const getInitialTab = () => {
    if (window.location.pathname.includes("dashboard")) {
      return 0;
    } else if (window.location.pathname.includes("activities")) {
      return 1;
    } else if (window.location.pathname.includes("contacts")) {
      return 2;
    } else {
      return 0;
    }
  };
  const [activeTab, setActiveTab] = useState(getInitialTab());
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  /* nav tabs highlighting */

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <Box sx={{ flexGrow: { xs: 1, sm: 0 } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 0.75, display: { xs: "none", sm: "block" } }}>
            <Typography variant="h6" component="div">
              Sales Activity Manager
            </Typography>
            <ReleaseVersion type={NavbarTypesEnum.Main} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <Tabs
              value={activeTab}
              indicatorColor="secondary"
              textColor="inherit"
              centered
              onChange={handleChange}
            >
              {navItems.map((item: string) => (
                <Tab
                  label={t("Common." + `${item}`)}
                  onClick={() => navigate("/" + unCapitalizeFirstLetter(item))}
                />
              ))}
            </Tabs>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}></Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <IconButton
              size="large"
              aria-label="change language"
              aria-controls={localeMenuId}
              onClick={handleLocaleMenuOpen}
              color="inherit"
            >
              <PublicIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={mainMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {user.email != "" ? (
                <Avatar>
                  {stringAvatar(
                    `${user.firstName} ${user.lastName}`
                  ).children.toString()}
                </Avatar>
              ) : (
                <Avatar />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Locales
        localeMenuAnchorEl={anchorElLocaleMenu}
        handleLocaleMenuClose={handleLocaleMenuClose}
        language={i18n.language}
        localeMenuId={localeMenuId}
      />
      <MobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        handleMobileMenuClose={handleMobileMenuClose}
        handleLocaleMenuOpen={handleLocaleMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        mobileMenuId={mobileMenuId}
      />
      <DesktopMenu
        mainMenuAnchorEl={anchorEl}
        handleMainMenuClose={handleMainMenuClose}
        isMainMenuOpen={isMainMenuOpen}
        mainMenuId={mainMenuId}
      />
      <Box component="nav">
        <CustomDrawer
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          navItems={navItems}
        />
      </Box>
      <Toolbar />
    </Box>
  );
}
