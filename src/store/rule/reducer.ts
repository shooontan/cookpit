import { ActionType, actionTypes } from './actions';
import { RuleState } from './state';

export const ruleReducer = (
  state: RuleState,
  action: ActionType
): RuleState => {
  switch (action.type) {
    case actionTypes.ADD_RULE:
      return {
        ...state,
        rules: [...state.rules, action.payload],
      };
    case actionTypes.DELETE_RULE:
      return {
        ...state,
        rules: state.rules.filter((rule) => rule.id !== action.payload),
      };
    case actionTypes.UPDATE_RULE:
      return {
        ...state,
        rules: state.rules.map((rule) => {
          if (rule.id === action.payload.id) {
            return action.payload;
          }
          return rule;
        }),
      };
    case actionTypes.SET_RULES:
      return {
        ...state,
        rules: [...action.payload],
      };
    default:
      return state;
  }
};
