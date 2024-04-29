export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

export interface UpdateProfileData {
  name: string;
  email: string;
  phone: string;
}

export interface UpdatePasswordData {
  password: string;
  newPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
  token: string;
}
