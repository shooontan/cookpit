/** @jsx h */
import { FunctionalComponent, h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';

import { RuleContext } from '../features/rule';
import { ruleActtions } from '../features/rule/actions';
import { Rule } from '../features/rule/state';
import { RuleForm } from './RuleForm';

export const Table: FunctionalComponent = () => {
  const { state, dispatch } = useContext(RuleContext);
  const { rules } = state;

  useEffect(() => {
    chrome.storage.local.get('rules', (items) => {
      const rules: Rule[] | undefined = items['rules'];
      if (rules) {
        dispatch(ruleActtions.setRules(rules));
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ rules });
  }, [rules]);

  return (
    <table>
      <thead>
        <td></td>
        <td>RegExp</td>
        <td>URL</td>
        <td>Body</td>
      </thead>
      <tbody>
        {rules.map((rule, idx) => {
          return <RuleForm key={idx} {...rule} />;
        })}
      </tbody>
    </table>
  );
};
