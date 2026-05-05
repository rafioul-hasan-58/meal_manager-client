/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { setCredentials, setError, setLoading } from "../features/auth/authSlice";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface SocialLoginResponse {
  data: any;
  access_token: string;
  refresh_token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    role: string;
    avatar?: string;
    phone?: string;
    isVerified?: boolean;
  };
}

// ── Shared fetch helper ────────────────────────────────────────────────────────
async function postJSON<T>(endpoint: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    throw { response: { data } };
  }

  return data as T;
}

// ── Shared error message extractor ────────────────────────────────────────────
function extractErrorMessage(err: any, fallback: string): string {
  return err?.response?.data?.message || err?.message || fallback;
}

// ── Google Login ───────────────────────────────────────────────────────────────
export const googleLoginThunk = createAsyncThunk(
  "auth/googleLogin",
  async (idToken: string, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const data = await postJSON<SocialLoginResponse>("/auth/google-login", {
        token: idToken,
      });

      dispatch(
        setCredentials({
          access_token: data?.data?.accessToken,
          refresh_token: data?.data?.refresh_token,
          user: data?.data?.user,
        }),
      );

      return data;
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.data?.message ||
        err?.message ||
        "Google login failed. Please try again.";
      dispatch(setError(message));
      return rejectWithValue(message);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

// ── Apple Login ────────────────────────────────────────────────────────────────
export interface AppleLoginPayload {
  code: string;
  id_token: string;
  user?: string; // JSON string — Apple only sends on first login
}

export const appleLoginThunk = createAsyncThunk(
  "auth/appleLogin",
  async (payload: AppleLoginPayload, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const data = await postJSON<SocialLoginResponse>(
        "/auth/apple-login",
        payload,
      );

      dispatch(
        setCredentials({
          access_token: data?.data?.access_token,
          refresh_token: data?.data?.refresh_token,
          user: data?.data?.user,
        }),
      );

      return data;
    } catch (err: any) {
      const message = extractErrorMessage(
        err,
        "Apple login failed. Please try again.",
      );
      dispatch(setError(message));
      return rejectWithValue(message);
    } finally {
      dispatch(setLoading(false));
    }
  },
);
