/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { RootState } from "../../store";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  avatar?: string;
  phone?: string;
  isVerified?: boolean;
  [key: string]: any;
}

export interface DecodedToken {
  id: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
  name?: string;
  [key: string]: any;
}

export interface AuthState {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Check if token is valid and not expired
export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    // Add 60 second buffer to avoid edge cases
    return decoded.exp > currentTime + 60;
  } catch {
    return false;
  }
};

// Helper to safely decode token
const decodeToken = (token: string): User | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name,
    };
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

// Initialize from cookies - SSR safe
const getInitialState = (): AuthState => {
  const defaultState: AuthState = {
    user: null,
    access_token: null,
    refresh_token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  // Only run on client side
  if (typeof window === "undefined") {
    return defaultState;
  }

  try {
    const authToken = Cookies.get("auth_token");
    const refreshToken = Cookies.get("refresh_token");
    const userInfo = Cookies.get("user_info");

    // Validate token before using it
    if (!isTokenValid(authToken || null)) {
      // Token expired or invalid - clear cookies
      Cookies.remove("auth_token", { path: "/" });
      Cookies.remove("refresh_token", { path: "/" });
      Cookies.remove("user_info", { path: "/" });
      return defaultState;
    }

    let user: User | null = null;

    // Try to get user from cookie first
    if (userInfo) {
      try {
        user = JSON.parse(userInfo);
      } catch (error) {
        console.error("Failed to parse user info from cookie:", error);
      }
    }

    // Fallback: decode from token
    if (authToken && !user) {
      user = decodeToken(authToken);
    }

    return {
      user,
      access_token: authToken || null,
      refresh_token: refreshToken || null,
      isAuthenticated: !!authToken && !!user,
      isLoading: false,
      error: null,
    };
  } catch (error) {
    console.error("Error initializing auth state:", error);
    return defaultState;
  }
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set credentials with cookies
    setCredentials: (
      state,
      action: PayloadAction<{
        user?: User | null;
        access_token: string;
        refresh_token?: string;
        rememberMe?: boolean;
      }>,
    ) => {
      const {
        user,
        access_token,
        refresh_token,
        rememberMe = false,
      } = action.payload;

      // Validate token before storing
      if (!isTokenValid(access_token)) {
        state.error = "Invalid or expired token";
        state.isAuthenticated = false;
        return;
      }

      const isProduction = process.env.NODE_ENV === "production";

      // Update Redux state
      if (user !== undefined) {
        state.user = user;
      } else if (access_token) {
        // Decode user from token if not provided
        state.user = decodeToken(access_token);
      }

      if (!state.user) {
        state.error = "Failed to extract user information from token";
        state.isAuthenticated = false;
        return;
      }

      state.access_token = access_token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;

      if (refresh_token !== undefined) {
        state.refresh_token = refresh_token;
      }

      // Store in cookies with appropriate expiry
      // Access token: 1 day (or 1 hour without remember me)
      // Refresh token: 30 days (or 7 days without remember me)
      const accessTokenExpiry = rememberMe ? 1 : 1 / 24; // 1 day or 1 hour
      const refreshTokenExpiry = rememberMe ? 30 : 7; // 30 days or 7 days

      try {
        Cookies.set("auth_token", access_token, {
          expires: accessTokenExpiry,
          secure: isProduction,
          sameSite: "strict",
          path: "/",
        });

        if (refresh_token) {
          Cookies.set("refresh_token", refresh_token, {
            expires: refreshTokenExpiry,
            secure: isProduction,
            sameSite: "strict",
            path: "/",
          });
        }

        if (state.user) {
          const safeUserData = {
            id: state.user.id,
            email: state.user.email,
            name: state.user.name,
            role: state.user.role,
            avatar: state.user.avatar,
          };
          Cookies.set("user_info", JSON.stringify(safeUserData), {
            expires: accessTokenExpiry,
            secure: isProduction,
            sameSite: "strict",
            path: "/",
          });
        }
      } catch (error) {
        console.error("Failed to set cookies:", error);
        state.error = "Failed to store authentication data";
      }
    },

    // Update user information
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (!state.user) {
        state.error = "No user to update";
        return;
      }

      state.user = { ...state.user, ...action.payload };

      // Update cookie
      try {
        const isProduction = process.env.NODE_ENV === "production";
        const safeUserData = {
          id: state.user.id,
          email: state.user.email,
          name: state.user.name,
          role: state.user.role,
          avatar: state.user.avatar,
        };
        Cookies.set("user_info", JSON.stringify(safeUserData), {
          expires: 1,
          secure: isProduction,
          sameSite: "strict",
          path: "/",
        });
        state.error = null;
      } catch (error) {
        console.error("Failed to update user cookie:", error);
        state.error = "Failed to update user information";
      }
    },

    // Update access token only (for token refresh)
    updateAccessToken: (state, action: PayloadAction<string>) => {
      const newToken = action.payload;

      // Validate new token
      if (!isTokenValid(newToken)) {
        state.error = "Invalid refresh token";
        state.isAuthenticated = false;
        return;
      }

      const isProduction = process.env.NODE_ENV === "production";
      state.access_token = newToken;
      state.error = null;

      // Update user from new token if needed
      if (!state.user) {
        state.user = decodeToken(newToken);
      }

      try {
        Cookies.set("auth_token", newToken, {
          expires: 1, // 1 day
          secure: isProduction,
          sameSite: "strict",
          path: "/",
        });
      } catch (error) {
        console.error("Failed to update access token cookie:", error);
        state.error = "Failed to update access token";
      }
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear auth data (without removing cookies)
    clearAuth: (state) => {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },

    // Complete logout (removes cookies)
    logout: (state) => {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;

      try {
        Cookies.remove("auth_token", { path: "/" });
        Cookies.remove("refresh_token", { path: "/" });
        Cookies.remove("user_info", { path: "/" });
      } catch (error) {
        console.error("Failed to remove cookies:", error);
      }

      if (typeof window !== "undefined") {
        try {
          localStorage.clear(); // ← changed from removeItem to clear()
          sessionStorage.clear();
        } catch (error) {
          console.error("Failed to clear storage:", error);
        }
      }
    },

    // Rehydrate auth from cookies (useful for checking validity)
    rehydrateAuth: (state) => {
      if (typeof window === "undefined") return;

      const authToken = Cookies.get("auth_token");
      const userInfo = Cookies.get("user_info");

      // Check if token is still valid
      if (!isTokenValid(authToken || null)) {
        // Token invalid - logout
        state.user = null;
        state.access_token = null;
        state.refresh_token = null;
        state.isAuthenticated = false;
        state.error = "Session expired";

        // Clean up cookies
        Cookies.remove("auth_token", { path: "/" });
        Cookies.remove("refresh_token", { path: "/" });
        Cookies.remove("user_info", { path: "/" });
        return;
      }

      let user: User | null = null;
      if (userInfo) {
        try {
          user = JSON.parse(userInfo);
        } catch (error) {
          console.error("Failed to parse user info:", error);
        }
      }

      // Fallback: decode from token
      if (authToken && !user) {
        user = decodeToken(authToken);
      }

      if (authToken && user) {
        state.access_token = authToken;
        state.user = user;
        state.isAuthenticated = true;
        state.error = null;
      }
    },
  },
});

export const {
  setCredentials,
  updateUser,
  updateAccessToken,
  setLoading,
  setError,
  clearAuth,
  logout,
  rehydrateAuth,
} = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentAccessToken = (state: RootState) =>
  state.auth.access_token;
export const selectCurrentRefreshToken = (state: RootState) =>
  state.auth.refresh_token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectUserRole = (state: RootState) => state.auth.user?.role;

// Enhanced selector: Check if user is authenticated AND token is valid
export const selectIsValidAuthenticated = (state: RootState) => {
  return (
    state.auth.isAuthenticated &&
    state.auth.access_token &&
    isTokenValid(state.auth.access_token)
  );
};

// Server-side auth state (for server components)
export const getServerSideAuthState = async () => {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    const authToken = cookieStore.get("auth_token")?.value;
    const userInfo = cookieStore.get("user_info")?.value;

    // Validate token server-side
    if (!isTokenValid(authToken || null)) {
      return {
        user: null,
        access_token: null,
        isAuthenticated: false,
      };
    }

    let user: User | null = null;
    if (userInfo) {
      try {
        user = JSON.parse(userInfo);
      } catch (error) {
        console.error("Failed to parse user info:", error);
      }
    }

    // Fallback: decode from token
    if (authToken && !user) {
      user = decodeToken(authToken);
    }

    return {
      user,
      access_token: authToken || null,
      isAuthenticated: !!authToken && !!user,
    };
  } catch (error) {
    console.error("Error getting server auth state:", error);
    return {
      user: null,
      access_token: null,
      isAuthenticated: false,
    };
  }
};
