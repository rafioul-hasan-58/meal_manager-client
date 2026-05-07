import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { RootState } from "../../store";

export interface User {
  userId: string;
  messId: string;
  email: string;
  globalRole: "ADMIN" | "USER";
}

export interface AuthState {
  user: User | null;
  access_token: string | null;
}

const decodeToken = (token: string): User | null => {
  try {
    return jwtDecode<User>(token);
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: Cookies.get("user_info")
      ? JSON.parse(Cookies.get("user_info")!)
      : null,
    access_token: Cookies.get("auth_token") || null,
  } as AuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ access_token: string }>) => {
      const { access_token } = action.payload;
      const user = decodeToken(access_token);

      state.access_token = access_token;
      state.user = user;

      Cookies.set("auth_token", access_token, { path: "/" });
      Cookies.set("user_info", JSON.stringify(user), { path: "/" });
    },

    logout: (state) => {
      state.user = null;
      state.access_token = null;

      Cookies.remove("auth_token", { path: "/" });
      Cookies.remove("user_info", { path: "/" });
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.access_token;