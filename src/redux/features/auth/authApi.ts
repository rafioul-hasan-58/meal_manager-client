// redux/features/auth/authApi.ts
import { API_ENDPOINTS } from "@/src/config/api";
import { baseApi } from "../../api/baseApi";
import { IForgotOtpVerifyResponse, IForgotPasswordPayload, IForgotPasswordResponse, ILoginPayload, ILoginResponse, IOtpPayload, IOtpResponse, IResetPasswordPayload, IResetPasswordResponse, IVerifyOtpPayload, IVerifyOtpResponse } from "@/src/types/authType";

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
    verifyForgotOtp: builder.mutation<IForgotOtpVerifyResponse, IVerifyOtpPayload>({
      query: (payload) => ({
        url: API_ENDPOINTS.AUTH.VERIFY_FORGOT_PASSWORD_OTP,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["auth"],
    }),
    // login with email and password
    login: builder.mutation<ILoginResponse, ILoginPayload>({
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

    // Forgot password
    forgotPassword: builder.mutation<IForgotPasswordResponse, IForgotPasswordPayload>({
      query: (payload) => {
        return {
          url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
          method: "POST",
          body: payload,
        };
      },
    }),
    // Change password (authenticated auth)
    resetPassword: builder.mutation<IResetPasswordResponse, IResetPasswordPayload>({
      query: (authInfo) => ({
        url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
        method: "POST",
        body: {
          email: authInfo.email,
          newPassword: authInfo.newPassword,
          confirmPassword: authInfo.confirmPassword
        },
      }),
      invalidatesTags: ["auth"],

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
  useVerifyOtpMutation,
  useVerifyForgotOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useUserUpdateProfileNotificationMutation,
} = authApi;

export default authApi;
