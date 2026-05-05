/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { RootState } from "../store";
import { logout, updateAccessToken } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    let token = (getState() as RootState).auth.access_token;

    if (!token) {
      token = Cookies.get("auth_token") || null;
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    headers.set("Accept", "application/json");

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    console.warn("Access token expired, attempting refresh...");

    const state = api.getState() as RootState;
    const refreshToken =
      state.auth.refresh_token || Cookies.get("refresh_token");

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          body: { refresh_token: refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const newAccessToken = (refreshResult.data as any).accessToken;

        if (newAccessToken) {
          console.log("Token refreshed successfully");
          api.dispatch(updateAccessToken(newAccessToken));
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.error("No access token in refresh response");
          api.dispatch(logout());

          if (typeof window !== "undefined") {
            window.location.href = "/auth/login";
          }
        }
      } else {
        console.error("Token refresh failed");
        api.dispatch(logout());

        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      }
    } else {
      api.dispatch(logout());
    }
  }

  if (result.error?.status === "FETCH_ERROR") {
    console.error("Network error:", result.error);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "auth",
    "user",
    "profile"
  ],
  endpoints: () => ({}),
});
