/** @jsx h */
import { createContext, FunctionalComponent, h } from 'preact';
import { useReducer } from 'preact/hooks';

import { ActionType } from './actions';
import { ruleReducer } from './reducer';
import { initialRuleState, RuleState } from './state';

type Dispatch = (action: ActionType) => void;

export const RuleContext = createContext<{
  state: RuleState;
  dispatch: Dispatch;
}>({
  state: initialRuleState,
  dispatch: () => {},
});

export const RuleProvider: FunctionalComponent = (props) => {
  const [state, dispatch] = useReducer(ruleReducer, initialRuleState);
  return (
    <RuleContext.Provider value={{ state, dispatch }}>
      {props.children}
    </RuleContext.Provider>
  );
};
