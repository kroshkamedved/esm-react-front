import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dataReducer from "./dataSlice";
import updateReducer from "./updateSlice";
import modalReducer from "./modalSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    update: updateReducer,
    modalState: modalReducer,
  },
});
