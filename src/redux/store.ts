import {configureStore, Middleware} from "@reduxjs/toolkit";
import languageSlice, {TLanguage} from "./slice/languageSlice.ts";
import userSlice, {TUser} from "./slice/userSlice.ts";
import dashboardRoutingSlice, {TDashboardRouting} from "./slice/dashboardRoutingSlice.ts";

export type RootState = {
    dashboardRouting: TDashboardRouting[];
    language: TLanguage;
    user: TUser;
};

type TStorageProps = {
    getState: () => RootState;
};

const localStorageMiddleware: Middleware = ({getState}: TStorageProps) => {
    return (next) => (action) => {
        const result = next(action);
        localStorage.setItem("applicationState", JSON.stringify(getState()));
        return result;
    };
};

const reHydrateStore = (): RootState | string | undefined => {
    const storedValue = localStorage.getItem("applicationState");
    if (storedValue) {
        return JSON.parse(storedValue || "");
    }
};

export const store = configureStore({
    reducer: {
        dashboardRouting: dashboardRoutingSlice,
        language: languageSlice,
        user: userSlice,
    },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
    // devTools: import.meta.env.MODE !== "production",
});
