import {createSlice} from "@reduxjs/toolkit";

export type TUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    createdAt: string;
};

const initialState: TUser = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
    createdAt: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (_state, action) => action.payload,
        resetUser: () => initialState,
    },
});

export const {setUser, resetUser} = userSlice.actions;

export default userSlice.reducer;
