import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const UserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetials: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserDetials } = UserSlice.actions;
export default UserSlice.reducer;
