/** @jsx h */
import { createContext, FunctionalComponent, h } from 'preact';
import { useReducer } from 'preact/hooks';

import { ActionType } from './actions';
import { errorReducer } from './reducer';
import { ErrorState, initialErrorState } from './state';

type Dispatch = (action: ActionType) => void;

export const ErrorContext = createContext<{
  state: ErrorState;
  dispatch: Dispatch;
}>({
  state: initialErrorState,
  dispatch: () => {},
});

export const ErrorProvider: FunctionalComponent = (props) => {
  const [state, dispatch] = useReducer(errorReducer, initialErrorState);
  return (
    <ErrorContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ErrorContext.Provider>
  );
};
