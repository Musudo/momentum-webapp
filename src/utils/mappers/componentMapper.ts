import {ComponentType, lazy, LazyExoticComponent} from 'react';

const HomeView = lazy(() => import("../../components/dashboard/homeView/HomeView"));
const DataView = lazy(() => import("../../components/dashboard/dataView/DataView"));
const MiscView = lazy(() => import("../../components/dashboard/miscView/MiscView"));
const SettingsView = lazy(() => import("../../components/dashboard/settingsView/SettingsView"));
const AboutView = lazy(() => import("../../components/dashboard/aboutView/AboutView"));


export const componentMapper: Record<string, LazyExoticComponent<ComponentType>> = {
    HomeView: HomeView,
    DataView: DataView,
    MiscView: MiscView,
    SettingsView: SettingsView,
    AboutView: AboutView
};
