import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hostName } from "../../config";

import { useSelector } from "react-redux";
import { json } from "react-router-dom";

export const updateData = createAsyncThunk(
  "update data through async thunk",
  async ({
    certificate,
    setErrorHook,
    jwt,
    addMode,
    deleteMod,
    deleteItemId,
  }) => {
    try {
      if (deleteMod) {
        let response = await fetch(`${hostName}/certificates/${deleteItemId}`, {
          method: "delete",
          headers: {
            Authorization: "Bearer " + jwt,
          },
        });
        if (response.ok) {
          return;
        } else {
          if (response.status === 0 || response.status >= 400) {
            const error = await response.json();
            if (error.errorMessage == "Data integrity violation") {
              setErrorHook(
                error.errorMessage +
                  ": Deletion of certificates associated with existing orders is prohibited"
              );
            }
          }
        }
      } else {
        let response = await fetch(`${hostName}/certificates`, {
          method: addMode ? "post" : "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt,
          },
          body: JSON.stringify(certificate),
        });
        if (response.ok) {
          return;
        } else {
          throw new Error("add error");
        }
      }
    } catch {
      setErrorHook("Error during certificate delete/update/add");
    }
  }
);

export const updateSlice = createSlice({
  name: "update",
  initialState: {
    loading: false,
    error: null,
    updated: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updated = false;
      })
      .addCase(updateData.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.updated = true;
      })
      .addCase(updateData.rejected, (state, action) => {
        state.loading = false;
        state.updated = false;
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
export default updateSlice.reducer;
