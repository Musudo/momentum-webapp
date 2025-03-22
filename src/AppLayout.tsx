"use client";

import {ErrorBoundary} from "react-error-boundary";
import {Outlet} from "react-router-dom";
import {Navbar} from "./components/navbar/Navbar";
import {MainContainer} from "./components/mainContainer.tsx";
import AppTheme from "./shared-theme/AppTheme.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import ColorModeSelect from "./shared-theme/ColorModeSelect.tsx";

const AppLayout = (props: { disableCustomTheme?: boolean }) => {
    return (
        <>
            <AppTheme {...props}>
                <Navbar/>
                <CssBaseline enableColorScheme/>
                <ColorModeSelect sx={{position: 'fixed', top: '1rem', right: '1rem'}}/>
                <MainContainer>
                    <ErrorBoundary fallback={<div>Error...</div>}>
                        <Outlet/>
                    </ErrorBoundary>
                </MainContainer>
            </AppTheme>
        </>
    );
};

export default AppLayout;
