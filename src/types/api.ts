export interface ApiResponse<T = any> {
  data: T;
  message: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  data?: any;
}
