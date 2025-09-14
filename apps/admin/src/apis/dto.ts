export interface ResponseDto<T> {
  status: number;
  message: string;
  data: T;
}
