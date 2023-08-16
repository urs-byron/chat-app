export interface iHttpResponse {
  data: { statusCode: number; [key: string]: any };
  err: { statusCode: number; [key: string]: any };
}
