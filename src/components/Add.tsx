/** @jsx h */
import { nanoid } from 'nanoid';
import { FunctionalComponent, h } from 'preact';
import { useCallback, useContext } from 'preact/hooks';

import { RuleContext } from '../store/rule';
import { ruleActtions } from '../store/rule/actions';
import { Rule } from '../store/rule/state';

export const Add: FunctionalComponent = () => {
  const { dispatch } = useContext(RuleContext);

  const addRule = useCallback(() => {
    const rule: Rule = {
      id: nanoid(5),
      url: '',
      body: '',
    };
    dispatch(ruleActtions.addRule(rule));
  }, []);

  return <button onClick={addRule}>Add</button>;
};
