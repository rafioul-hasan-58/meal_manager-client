export interface IOtpPayload {
  email: string;
}

export interface IOtpResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    message: string;
  };
}
export interface IVerifyOtpPayload {
  email: string;
  otp: string;
}

export interface IVerifyOtpResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    message: string;
  };
}
// ── Login Response ──────────────────────────────────────────────────────────
export interface ILoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface ILoginPayload {
  email: string;
  password: string;
}

// ── Forgot Password Payload ────────────────────────────────────────────────
export interface IForgotPasswordPayload {
  email: string;
}

// ── Forgot Password Response ───────────────────────────────────────────────
export interface IForgotPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    message: string;
  };
}
// Redux Response Type
export interface IForgotOtpVerifyResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
  };
}

// Redux Payload Type
export interface IResetPasswordPayload {
  email: string;
  newPassword: string;
  confirmPassword: string;
}


// Redux Response Type
export interface IResetPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
}
