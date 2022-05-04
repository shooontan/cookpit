import { ActionType, actionTypes } from './actions';
import { ErrorState } from './state';

export const errorReducer = (
  state: ErrorState,
  action: ActionType
): ErrorState => {
  switch (action.type) {
    case actionTypes.ADD_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    default:
      return state;
  }
};
