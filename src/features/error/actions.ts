import { AppError } from './state';

const ADD_ERROR = 'ADD_ERROR';

export const actionTypes = {
  ADD_ERROR,
} as const;

const addError = (error: AppError) => ({
  type: actionTypes.ADD_ERROR,
  payload: error,
});

export const errorActtions = {
  addError,
};

export type ActionType = ReturnType<typeof addError>;
