import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {unCapitalizeFirstLetter} from "../../utils/stringHelpers.ts";
import {MomentumIcon} from "../authentication/signIn/CustomIcons.tsx";
import {ListItemButton} from "@mui/material";

type TCustomDrawerProps = {
    handleDrawerToggle: () => void;
    mobileOpen: boolean;
    navItems: string[];
};

const MobileDrawer = (props: TCustomDrawerProps) => {
    const {handleDrawerToggle, mobileOpen, navItems} = props;
    const {t} = useTranslation();

    return (
        <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: {xs: "block", sm: "none"},
                "& .MuiDrawer-paper": {boxSizing: "border-box", width: 240},
            }}
        >
            <Box
                role="presentation"
                onClick={handleDrawerToggle}
            >
                <Box
                    sx={{
                        p: 2,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <MomentumIcon height={30} width={140}/>
                </Box>
                <Divider/>
                <Box
                    sx={{
                        p: 2,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <List>
                        {navItems.map((item: string, index: number) => (
                            <ListItem
                                key={index}
                                disablePadding
                                sx={{
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <ListItemButton component={Link} to={`/${unCapitalizeFirstLetter(item)}`}>
                                    <ListItemText primary={t("Common." + `${item}`)}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Drawer>
    );
};

export default MobileDrawer;
