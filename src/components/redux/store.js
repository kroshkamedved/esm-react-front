import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dataReducer from "./dataSlice";
import modalReducer from "./modalSlice";
import updateReducer from "./updateSlice";
import confirmReducer from "./confirmSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    modalState: modalReducer,
    updateState: updateReducer,
    confirmState: confirmReducer,
  },
});
