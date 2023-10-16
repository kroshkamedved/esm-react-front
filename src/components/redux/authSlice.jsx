import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hostName } from "../../config";

export const loginUser = createAsyncThunk(
  "loginUserFromAsyncThunk",
  async (userCredentials) => {
    let response = await fetch(`${hostName}/api/public/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    }).catch((error) => new Error("Server communication error"));
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("credential", JSON.stringify(userCredentials));
      return data;
    } else if (response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("Server communication error");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: null,
    jwt: "",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.jwt = "";
      state.user = null;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("credential");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthenticated = false;
        state.loading = true;
        state.jwt = "";
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, jwt } = action.payload;
        state.isAuthenticated = true;
        state.jwt = jwt;
        state.user = user;
        state.error = null;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.jwt = "";
        state.user = null;
        console.log(action.error.message);
        if (action.error.message === "Unauthorized") {
          state.error = "Access Denied! Invalid Credentials";
        } else if (action.error.message === "Server communication error") {
          state.error = action.error.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});
export default authSlice.reducer;
export const { logout, rejected } = authSlice.actions;
