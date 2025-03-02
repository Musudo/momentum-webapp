import { Logout } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/slice/userSlice";
import { RootState } from "../../redux/store";
import {AuthProvider} from "../../utils/auth/authProvider.ts";

type TProps = {
  mainMenuAnchorEl: HTMLElement | null;
  handleMainMenuClose: () => void;
  isMainMenuOpen: boolean;
  mainMenuId: string;
};

const DesktopMenu = (props: TProps) => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <Menu
      anchorEl={props.mainMenuAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={props.mainMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={props.isMainMenuOpen}
      onClose={props.handleMainMenuClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
    >
      {AuthProvider.isAuthenticated ? (
        <MenuItem
          key="signOut"
          onClick={() => {
            dispatch(resetUser());
            window.location.href = AuthProvider.signOut();
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
            window.location.href = `${window.location.origin}${import.meta.env.VITE_AUTH_SIGNIN_URL}`;
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

export default DesktopMenu;
