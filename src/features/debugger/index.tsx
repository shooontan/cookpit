/** @jsx h */
import { createContext, FunctionalComponent, h } from 'preact';
import { useReducer } from 'preact/hooks';

import { DebuggerActionType } from './actions';
import { debuggerReducer } from './reducer';
import { DebuggerState, initialDebuggerState } from './state';

type Dispatch = (action: DebuggerActionType) => void;

export const DebuggerContext = createContext<{
  state: DebuggerState;
  dispatch: Dispatch;
}>({
  state: initialDebuggerState,
  dispatch: () => {},
});

export const DebuggerProvider: FunctionalComponent = (props) => {
  const [state, dispatch] = useReducer(debuggerReducer, initialDebuggerState);
  return (
    <DebuggerContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DebuggerContext.Provider>
  );
};
