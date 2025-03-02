import {ComponentType, lazy, LazyExoticComponent} from 'react';

const HomeView = lazy(() => import("../../components/dashboard/homeView/HomeView"));
const ContactsDataView = lazy(() => import("../../components/dashboard/contactsDataView/ContactsDataView"));
const SettingsView = lazy(() => import("../../components/dashboard/settingsView/SettingsView"));
const AboutView = lazy(() => import("../../components/dashboard/aboutView/AboutView"));


export const componentMapper: Record<string, LazyExoticComponent<ComponentType>> = {
    HomeView: HomeView,
    ContactsDataView: ContactsDataView,
    SettingsView: SettingsView,
    AboutView: AboutView
};
