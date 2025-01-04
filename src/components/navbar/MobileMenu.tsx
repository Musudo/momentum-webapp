import { Logout } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import PublicIcon from "@mui/icons-material/Public";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/slice/userSlice";
import { RootState } from "../../redux/store";
import { stringAvatar } from "../../utils/AvatarGeneratorUtil";

type TProps = {
  mobileMoreAnchorEl: HTMLElement | null;
  handleMobileMenuClose: () => void;
  handleLocaleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  isMobileMenuOpen: boolean;
  mobileMenuId: string;
};

const MobileMenu = (props: TProps) => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <Menu
      anchorEl={props.mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={props.mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={props.isMobileMenuOpen}
      onClose={props.handleMobileMenuClose}
    >
      <MenuItem key="profile mobile menu">
        {user.email != "" ? (
          <Avatar>
            {stringAvatar(
              `${user.firstName} ${user.lastName}`
            ).children.toString()}
          </Avatar>
        ) : (
          <Avatar />
        )}
        User account
      </MenuItem>
      <MenuItem key="locale mobile menu" onClick={props.handleLocaleMenuOpen}>
        <IconButton size="small" color="inherit">
          <PublicIcon />
        </IconButton>
        {t("Common.Active language")}
      </MenuItem>
      <Divider />
      {user && user.roles.includes("ROLE_USER") ? (
        <MenuItem
          key="signOut"
          onClick={() => {
            sessionStorage.removeItem("authToken");
            dispatch(resetUser());
            window.location.href = "/signIn";
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t("Common.Logout")}
        </MenuItem>
      ) : (
        <MenuItem
          key="signIn"
          onClick={() => {
            window.location.href = "/signIn";
          }}
        >
          <ListItemIcon>
            <LoginIcon fontSize="small" />
          </ListItemIcon>
          {t("Common.Login")}
        </MenuItem>
      )}
    </Menu>
  );
};

export default MobileMenu;
