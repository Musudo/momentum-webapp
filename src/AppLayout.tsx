"use client";

import {ErrorBoundary} from "react-error-boundary";
import {Outlet} from "react-router-dom";
import {MainContainer} from "./components/mainContainer.tsx";
import AppTheme from "./theme/AppTheme.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/navbar/Navbar.tsx";
import {useMediaQuery, useTheme} from "@mui/material";
import MobileNavbar from "./components/navbar/MobileNavbar.tsx";

const AppLayout = (props: { disableCustomTheme?: boolean }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
            <AppTheme {...props}>
                <CssBaseline enableColorScheme/>
                {/*TODO: find out what this does*/}
                {isMobile ? <MobileNavbar/> : <Navbar/>}
                <MainContainer parentStyles={{marginTop: '40px'}}>
                    <ErrorBoundary fallback={<div>Error...</div>}>
                        <Outlet/>
                    </ErrorBoundary>
                </MainContainer>
            </AppTheme>
        </>
    );
};

export default AppLayout;
