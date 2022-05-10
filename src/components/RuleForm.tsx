/** @jsx h */
import { FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';

import { RuleContext } from '../features/rule';
import { ruleActtions } from '../features/rule/actions';
import { Rule } from '../features/rule/state';

export type RuleProps = Rule;

export const RuleForm: FunctionalComponent<RuleProps> = (props) => {
  const { dispatch } = useContext(RuleContext);

  return (
    <tr>
      <td>
        <button onClick={() => dispatch(ruleActtions.deleteRule(props.id))}>
          Delete
        </button>
      </td>
      <td>
        <input
          type="checkbox"
          checked={props.regexp}
          onInput={({ target }) => {
            if (target instanceof HTMLInputElement) {
              const rule: Rule = {
                ...props,
                regexp: target.checked,
              };
              dispatch(ruleActtions.updateRule(rule));
            }
          }}
        />
      </td>
      <td>
        <input
          value={props.url}
          placeholder="URL"
          onInput={({ target }) => {
            if (target instanceof HTMLInputElement) {
              const rule: Rule = {
                ...props,
                url: target.value,
              };
              dispatch(ruleActtions.updateRule(rule));
            }
          }}
        />
      </td>
      <td>
        <input
          value={props.body}
          placeholder="Response Body"
          onInput={({ target }) => {
            if (target instanceof HTMLInputElement) {
              const rule: Rule = {
                ...props,
                body: target.value,
              };
              dispatch(ruleActtions.updateRule(rule));
            }
          }}
        />
      </td>
    </tr>
  );
};
