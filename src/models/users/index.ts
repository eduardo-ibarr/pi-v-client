export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  birth_date: string;
  gender: string;
  role: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  is_active: boolean;
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
  email: string;
  password: string;
  token: string;
}
