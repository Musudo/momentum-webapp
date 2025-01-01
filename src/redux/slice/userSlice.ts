import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  email: string;
  password: string;
  roles: [];
};

const initialState: TUser = {
  email: "",
  password: "",
  roles: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_state, action) => action.payload,
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
