export class ApiResponse<T> {
  public success: boolean;
  public message: string;
  public data: T;

  constructor(success: boolean, message: string, data: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success<T>(
    data: T,
    message: string = "Success",
    statusCode: number = 200,
  ) {
    return {
      success: true,
      statusCode,
      message,
      data,
    };
  }

  static error(message: string, error?: any) {
    return {
      success: false,
      message,
      error,
    };
  }
}
