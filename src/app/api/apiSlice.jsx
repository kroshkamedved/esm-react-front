import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { hostName as baseUrl } from "../../config";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.jwt;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
