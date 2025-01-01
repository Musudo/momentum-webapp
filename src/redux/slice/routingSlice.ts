import { createSlice } from '@reduxjs/toolkit';
import { TPermission } from './permissionSlice';

export type TRouting = {
  component: string;
  guid: string;
  displayName: string;
  path: string;
  visibleInSideMenu: boolean;
  childPages: TRouting[];
  permissions: TPermission[];
};

const initialState: TRouting[] = [];

const routingSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    routingAdded: (_state, action) => action.payload,
  },
});

export const { routingAdded } = routingSlice.actions;

export default routingSlice.reducer;

