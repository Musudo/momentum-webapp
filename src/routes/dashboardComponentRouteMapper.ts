import {ComponentType, lazy, LazyExoticComponent} from 'react';

const HomeView = lazy(() => import("../components/dashboard/homeView/HomeView.tsx"));
const DataView = lazy(() => import("../components/dashboard/dataView/DataView.tsx"));
const MiscView = lazy(() => import("../components/dashboard/miscView/MiscView.tsx"));
const SettingsView = lazy(() => import("../components/dashboard/settingsView/SettingsView.tsx"));
const AboutView = lazy(() => import("../components/dashboard/aboutView/AboutView.tsx"));


export const dashboardComponentRouteMapper: Record<string, LazyExoticComponent<ComponentType>> = {
    HomeView: HomeView,
    DataView: DataView,
    MiscView: MiscView,
    SettingsView: SettingsView,
    AboutView: AboutView
};
