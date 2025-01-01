import { createSlice } from '@reduxjs/toolkit';
import { EPermissions } from '../../types/enums/EPermissions';

export type TPermission = EPermissions;

const initialState: TPermission[] = [];

const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setPermissions: (_state, action) => action.payload,
  },
});

export const { setPermissions } = permissionSlice.actions;

export default permissionSlice.reducer;