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


