import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Divider, ListItemIcon, Menu, MenuItem, Tab, Tabs, useMediaQuery, useTheme} from "@mui/material";
import AppBar from "@mui/material/AppBar/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import '../../i18n';
import {unCapitalizeFirstLetter} from "../../utils/stringHelpers.ts";
import {matchPath} from "react-router";
import {AccountCircle, Logout} from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";
import {resetUser} from "../../redux/slice/userSlice.ts";
import {AuthProvider} from "../../utils/auth/authProvider.ts";
import LoginIcon from "@mui/icons-material/Login";
import {Languages} from "../../constants/commonConstants.ts";
import Cookies from "js-cookie";
import SettingsIcon from '@mui/icons-material/Settings';
import ContrastIcon from '@mui/icons-material/Contrast';
import {useColorScheme} from "@mui/material/styles";

export const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorElColorMode, setAnchorElColorMode] = useState<null | HTMLElement>(null);
    const [anchorElLocales, setAnchorElLocales] = useState<null | HTMLElement>(null);
    const dispatch = useDispatch();
    const {t, i18n} = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const {mode, setMode} = useColorScheme();

    if (!mode) {
        return null;
    }

    const handleLocaleMenuChange = (event: React.MouseEvent<HTMLElement>) => {
        i18n.changeLanguage(event.currentTarget.dataset.lang);
        Cookies.set("lang", event.currentTarget.dataset.lang ?? "en", {
            expires: 7,
        });
    };

    return (
        <>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event) => setAnchorEl(event.currentTarget)}
                // color="inherit"
            >
                {isMobile ? <><MoreVertIcon/></> : <><AccountCircle/></>}
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: isMobile ? "bottom" : "top",
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: isMobile ? "bottom" : "top",
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {AuthProvider.isAuthenticated ? (
                    <>
                        <MenuItem
                            component={Link}
                            to="/profile"
                            onFocus={() => setAnchorEl(null)}
                        >
                            <ListItemIcon>
                                <SettingsIcon fontSize="small"/>
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={(event) => setAnchorElColorMode(event.currentTarget)}>
                            <ListItemIcon>
                                <ContrastIcon fontSize="small"/>
                            </ListItemIcon>
                            Color mode
                        </MenuItem>
                        <Menu
                            id="color-mode-appbar"
                            anchorEl={anchorElColorMode}
                            anchorOrigin={{
                                vertical: isMobile ? "bottom" : "top",
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: isMobile ? "bottom" : "top",
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElColorMode)}
                            onClose={() => setAnchorElColorMode(null)}
                            onFocus={() => setAnchorEl(null)}
                        >
                            {["system", "light", "dark"].map((item, index) => (
                                <MenuItem
                                    key={index}
                                    value={item}
                                    selected={theme.palette.mode === item}
                                    onClick={() => setMode(item as "system" | "light" | "dark")}
                                >
                                    {item}
                                </MenuItem>
                            ))}
                        </Menu>
                        <MenuItem onClick={(event) => setAnchorElLocales(event.currentTarget)}>
                            <ListItemIcon>
                                <LanguageIcon fontSize="small"/>
                            </ListItemIcon>
                            {t("Common.Active language")}
                        </MenuItem>
                        <Menu
                            id="languages-appbar"
                            anchorEl={anchorElLocales}
                            anchorOrigin={{
                                vertical: isMobile ? "bottom" : "top",
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: isMobile ? "bottom" : "top",
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElLocales)}
                            onClose={() => setAnchorElLocales(null)}
                            onFocus={() => setAnchorEl(null)}
                        >
                            {Languages.map(
                                (
                                    lang: {
                                        shorthand: string;
                                        longhand: string;
                                    },
                                    index: number
                                ) => (
                                    <MenuItem
                                        key={index}
                                        data-lang={lang.shorthand}
                                        onClick={handleLocaleMenuChange}
                                        selected={i18n.language === lang.shorthand}
                                    >
                                        {lang.longhand}
                                    </MenuItem>
                                )
                            )}
                        </Menu>
                        <Divider/>
                        <MenuItem
                            onClick={() => {
                                dispatch(resetUser());
                                window.location.href = AuthProvider.signOut();
                            }}
                        >
                            <ListItemIcon>
                                <Logout fontSize="small"/>
                            </ListItemIcon>
                            {t("Common.Logout")}
                        </MenuItem>
                    </>
                ) : (
                    <MenuItem
                        key="signIn"
                        onClick={() => {
                            window.location.href = `${window.location.origin}${import.meta.env.VITE_AUTH_SIGN_IN_URL}`;
                        }}
                    >
                        <ListItemIcon>
                            <LoginIcon fontSize="small"/>
                        </ListItemIcon>
                        {t("Common.Login")}
                    </MenuItem>
                )}
            </Menu>
        </>
    );
};

const Navbar = () => {
    const {t} = useTranslation();
    const navItems = ["Dashboard", "Activities", "Contacts"];
    const location = useLocation();

    let currentPath: string | boolean = '/';
    if (matchPath('/', location.pathname)) {
        currentPath = '/';
    } else if (matchPath('/dashboard', location.pathname)) {
        currentPath = '/dashboard';
    } else if (matchPath('/activities/*', location.pathname)) {
        currentPath = '/activities';
    } else if (matchPath('/contacts/*', location.pathname)) {
        currentPath = '/contacts';
    } else {
        currentPath = false;
    }

    return (
        <Box component="nav" sx={{flexGrow: 1}}>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <Box flex={1} display="flex" justifyContent="space-between">
                        <Box width="200px">
                            {/* Placeholder to balance the layout */}
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Tabs
                                value={currentPath}
                                aria-label="Navigation Tabs"
                                indicatorColor="secondary"
                                centered
                            >
                                {navItems.map((item: string, index: number) => (
                                    <Tab
                                        key={index}
                                        label={t("Common." + item)}
                                        component={Link}
                                        to={unCapitalizeFirstLetter(item)}
                                        value={`/${unCapitalizeFirstLetter(item)}`}
                                    />
                                ))}
                            </Tabs>
                        </Box>
                        <Box display="flex" alignItems="center" width="200px" justifyContent="flex-end">
                            <UserMenu/>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;