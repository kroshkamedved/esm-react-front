import { createSlice } from "@reduxjs/toolkit";

const confirmSlice = createSlice({
  name: "confirmState",
  initialState: {
    isOpened: false,
    currentIndex: undefined,
  },
  reducers: {
    confirm: (state, action) => {
      state.isOpened = true;
      state.currentIndex = action.payload;
    },
    cancel: (state) => {
      state.isOpened = false;
      state.currentIndex = undefined;
    },
  },
});

export const { confirm, cancel } = confirmSlice.actions;
export default confirmSlice.reducer;
