import {configureStore, Middleware} from "@reduxjs/toolkit";
import userSlice, {TUser} from "./slice/userSlice.ts";
import dashboardRoutingSlice, {TDashboardRouting} from "./slice/dashboardRoutingSlice.ts";

export type RootState = {
    dashboardRouting: TDashboardRouting[];
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
        user: userSlice,
    },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
    // devTools: import.meta.env.MODE !== "production",
});
