import { actionTypes, DebuggerActionType } from './actions';
import { DebuggerState } from './state';

export const debuggerReducer = (
  state: DebuggerState,
  action: DebuggerActionType
): DebuggerState => {
  switch (action.type) {
    case actionTypes.START_DEBUGGER:
      return {
        ...state,
        active: true,
      };
    case actionTypes.STOP_DEBUGGER:
      return {
        ...state,
        active: false,
      };
    default:
      return state;
  }
};
