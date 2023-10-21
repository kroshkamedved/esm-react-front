import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hostName } from "../../config";

export const getData = createAsyncThunk(
  "getDataFromAsyncThunk",
  async ({
    jwt,
    requestParams,
    setErrorHook,
    setDbData,
    performSearch = false,
    requestParamsString,
  }) => {
    let requestUri;
    if (performSearch) {
      requestUri = hostName + "/certificates?" + requestParamsString;
    } else {
      const { nextPage, pageSize } = requestParams;
      requestUri =
        hostName +
        "/certificates/all?" +
        (nextPage ? `page=${nextPage}&` : "") +
        (pageSize ? `size=${pageSize}` : "");
    }
    try {
      const response = await fetch(requestUri, {
        method: "get",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      });
      if (response.status === 0 || response.status >= 400) {
        // Handle network error or server error
        throw new Error("Server communication error");
      }
      if (response.ok) {
        const newData = await response.json();
        return newData;
      } else {
        setErrorHook("Server communication error");
      }
    } catch {
      setErrorHook("Server communication error");
    }
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    error: null,
    loading: false,
    currentPage: 0,
    records: 0,
    data: null,
  },
  reducers: {
    search: (state, action) => {
      if (action.payload) {
        console.log(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state, action) => {
        state.error = null;
        state.loading = true;
        state.currentPage = 0;
        state.records = 0;
      })
      .addCase(getData.rejected, (state, action) => {
        const { setErrorHook } = action.payload;
        setErrorHook(action.error.message);
        state.error = action.error;
        state.loading = true;
        state.cureentPage = 0;
        state.records = 0;
      })
      .addCase(getData.fulfilled, (state, action) => {
        if (action.payload?._embedded) {
          const { _embedded, page } = action.payload;
          state.cureentPage = page.number;
          state.records = page.totalElements;
          state.data = page.certificateModelList;
        } else {
          state.data = action.payload;
        }
        state.error = null;
        state.loading = false;
      });
  },
});

export default dataSlice.reducer;

export const { search } = dataSlice.actions;
