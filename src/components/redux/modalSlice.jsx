import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modalState",
  initialState: {
    isOpened: false,
    editMode: false,
    addMode: false,
    viewMode: false,
    currentIndex: undefined,
  },
  reducers: {
    edit: (state, action) => {
      state.viewMode = false;
      state.addMode = false;
      state.editMode = true;
      state.isOpened = true;
      state.currentIndex = action.payload;
    },
    add: (state) => {
      state.viewMode = false;
      state.addMode = true;
      state.editMode = false;
      state.isOpened = true;
      state.currentIndex = undefined;
    },
    close: (state) => {
      state.viewMode = false;
      state.addMode = false;
      state.editMode = false;
      state.isOpened = false;
      state.currentIndex = undefined;
    },
    view: (state, action) => {
      state.viewMode = true;
      state.addMode = false;
      state.editMode = false;
      state.isOpened = true;
      state.currentIndex = action.payload;
    },
  },
});

export const { edit, add, close, view } = modalSlice.actions;
export default modalSlice.reducer;
