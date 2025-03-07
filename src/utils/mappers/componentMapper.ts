import {ComponentType, lazy, LazyExoticComponent} from 'react';

const HomeView = lazy(() => import("../../components/dashboard/homeView/HomeView"));
const DataView = lazy(() => import("../../components/dashboard/dataView/DataView"));
const TasksView = lazy(() => import("../../components/dashboard/tasksView/TasksView"));
const SettingsView = lazy(() => import("../../components/dashboard/settingsView/SettingsView"));
const AboutView = lazy(() => import("../../components/dashboard/aboutView/AboutView"));


export const componentMapper: Record<string, LazyExoticComponent<ComponentType>> = {
    HomeView: HomeView,
    DataView: DataView,
    TasksView: TasksView,
    SettingsView: SettingsView,
    AboutView: AboutView
};
