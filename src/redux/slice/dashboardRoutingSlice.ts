import {createSlice} from '@reduxjs/toolkit';

export type TDashboardRouting = {
    name: string;
    isVisible: boolean;
};

const initialState: TDashboardRouting[] = [
    {name: 'HomeView', isVisible: true},
    {name: 'DataView', isVisible: false},
    {name: 'TasksView', isVisible: false},
    {name: 'SettingsView', isVisible: false},
    {name: 'AboutView', isVisible: false},
];

const dashboardRoutingSlice = createSlice({
    name: 'dashboardRouting',
    initialState,
    reducers: {
        setDashboardRouting: (_state, action) => action.payload,
    },
});

export const {setDashboardRouting} = dashboardRoutingSlice.actions;

export default dashboardRoutingSlice.reducer;