import { AxiosError } from 'axios';

export interface ApiError {
  error: string;
}

export type TypedAxiosError = AxiosError<ApiError>;

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface AuthResponse {
  user: {
    id: number;
    email: string;
  };
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
