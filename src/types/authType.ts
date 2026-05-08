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

