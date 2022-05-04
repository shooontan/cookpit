export type AppError = Error;

export type ErrorState = {
  errors: AppError[];
};

export const initialErrorState: ErrorState = {
  errors: [],
};
