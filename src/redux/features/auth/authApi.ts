// redux/features/auth/authApi.ts
import { API_ENDPOINTS } from "@/src/config/api";
import { baseApi } from "../../api/baseApi";
import { ILoginPayload, ILoginResponse, IOtpPayload, IOtpResponse, IVerifyOtpPayload, IVerifyOtpResponse } from "@/src/types/authType";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // verify user email
    verifyEmail: builder.mutation<IOtpResponse, IOtpPayload>({
      query: (payload) => ({
        url: API_ENDPOINTS.AUTH.VERIFY_EMAIL,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["auth"],
    }),
    // verify otp code
    verifyOtp: builder.mutation<IVerifyOtpResponse, IVerifyOtpPayload>({
      query: (payload) => ({
        url: API_ENDPOINTS.AUTH.VERIFY_OTP,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["auth"],
    }),
    // login with email and password
    login: builder.mutation<ILoginResponse,ILoginPayload>({
      query: (authInfo) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: "POST",
        body: authInfo,
      }),
      invalidatesTags: ["auth"],
    }),

    // Login with Google
    loginWithGoogle: builder.mutation({
      query: (authInfo) => {
        console.log("Google Login Request:", authInfo);
        return {
          url: "/auth/google-login",
          method: "POST",
          body: authInfo,
        };
      },
      invalidatesTags: ["auth"],
    }),

    // Register new auth
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    reSendOtp: builder.mutation({
      query: (authInfo) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: authInfo,
      }),
      invalidatesTags: ["auth"],
    }),

    // Forgot password
    forgotPassword: builder.mutation({
      query: (email) => {
        return {
          url: "/auth/forgot-password",
          method: "POST",
          body: email,
        };
      },
    }),

    // Reset password (with token from email)
    newPassword: builder.mutation({
      query: (authInfo) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: authInfo,
      }),
    }),

    // Change password (authenticated auth)
    resetPassword: builder.mutation({
      query: (authInfo) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: authInfo,
      }),
      invalidatesTags: ["auth"],
    }),

    // Get current auth profile
    getMe: builder.query({
      query: () => ({
        url: "/user/my-profile",
        method: "GET",
      }),
      providesTags: ["auth", "profile"],
    }),

    // Update auth profile
    updateauth: builder.mutation({
      query: (formData) => ({
        url: "/auth/update-profile",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["auth", "profile"],
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["auth", "profile"],
    }),
    userUpdateProfileNotification: builder.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["auth", "profile"],
    }),
  }),
});

export const {
  useVerifyEmailMutation,
  useLoginMutation,
  useLoginWithGoogleMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useReSendOtpMutation,
  useForgotPasswordMutation,
  useNewPasswordMutation,
  useResetPasswordMutation,
  useGetMeQuery,
  useUpdateauthMutation,
  useUpdateProfileMutation,
  useUserUpdateProfileNotificationMutation,
} = authApi;

export default authApi;
