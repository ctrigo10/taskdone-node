export class AppError extends Error {
  constructor(message, status = 500, name = 'AppError') {
    super(message);
    this.name = name;
    this.status = status;
  }
}

export function createHttpError(message, status = 500, name = 'HttpError') {
  return new AppError(message, status, name);
}
