export interface IRegister {
  // ── User fields (from User model)
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  photoFile: File | null;
  photoPreview: string | null;
  // ── Mess fields (from Mess model)
  messName: string;
  messAddress: string;
  messDescription: string;
  approxTotalMembers: number;
}

export interface IRegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    message: string;
  };
}

export interface IRegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  messName: string;
  messAddress?: string;
  messDescription?: string;
  approxTotalMembers: number;
}