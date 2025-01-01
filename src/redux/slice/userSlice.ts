import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
};

const initialState: TUser = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  roles: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_state, action) => action.payload,
    reset: () => initialState,
  },
});

export const { setUser, reset } = userSlice.actions;

export default userSlice.reducer;
