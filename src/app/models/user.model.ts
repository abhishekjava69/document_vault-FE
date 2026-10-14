
export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  userId?: number | string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message?: string;
  token?: string;
  accessToken?: string;
  jwt?: string;
  userId?: number | string;
  name?: string;
  email?: string;
  data?: {
    token?: string;
    accessToken?: string;
    jwt?: string;
  };
}

export interface User {
  id?: number | string;
  name: string;
  email: string;
  phone: string;
}
