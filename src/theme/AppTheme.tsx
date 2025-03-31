import * as React from "react";
import type {ThemeOptions} from "@mui/material/styles";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {inputsCustomizations} from "./customizations/inputs";
import {dataDisplayCustomizations} from "./customizations/dataDisplay";
import {feedbackCustomizations} from "./customizations/feedback";
import {navigationCustomizations} from "./customizations/navigation";
import {surfacesCustomizations} from "./customizations/surfaces";
import {brand, colorSchemes, gray, shadows, shape, typography} from "./theme.ts";

interface AppThemeProps {
    children: React.ReactNode;
    /**
     * This is for the docs site. You can ignore it or remove it.
     */
    disableCustomTheme?: boolean;
    themeComponents?: ThemeOptions["components"];
}

export default function AppTheme(props: AppThemeProps) {
    const {children, disableCustomTheme, themeComponents} = props;
    const theme = React.useMemo(() => {
        return disableCustomTheme
            ? {}
            : createTheme({
                // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
                cssVariables: {
                    colorSchemeSelector: "data-mui-color-scheme",
                    cssVarPrefix: "template",
                },
                colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
                typography,
                shadows,
                shape,
                components: {
                    ...inputsCustomizations,
                    ...dataDisplayCustomizations,
                    ...feedbackCustomizations,
                    ...navigationCustomizations,
                    ...surfacesCustomizations,
                    ...themeComponents,
                    /*TODO: consider moving these parts to separate files*/
                    MuiAppBar: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                backgroundColor: brand[300],
                                boxShadow: 'none',
                                ...theme.applyStyles('dark', {
                                    backgroundColor: brand[800],
                                    boxShadow: 'none',
                                }),
                            }),
                        },
                        defaultProps: {
                            elevation: 0,
                        },
                    },

                    MuiSpeedDial: {
                        styleOverrides: {
                            fab: ({ theme }) => ({
                                backgroundColor: theme.palette.mode === 'dark' ? brand[800] : brand[300],
                                '&:hover': {
                                    backgroundColor: brand[700],
                                },
                            }),
                        },
                    },
                    MuiSpeedDialAction: {
                        styleOverrides: {
                            fab: ({ theme }) => ({
                                backgroundColor: theme.palette.mode === 'dark' ? gray[800] : gray[50],
                                '&:hover': {
                                    backgroundColor: gray[200],
                                },
                            }),
                        }
                    }
                },
            });
    }, [disableCustomTheme, themeComponents]);
    if (disableCustomTheme) {
        return <React.Fragment>{children}</React.Fragment>;
    }
    return (
        <ThemeProvider theme={theme} disableTransitionOnChange>
            {children}
        </ThemeProvider>
    );
}
