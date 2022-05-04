/** @jsx h */
import { FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';

import { RuleContext } from '../store/rule';
import { ruleActtions } from '../store/rule/actions';
import { Rule } from '../store/rule/state';

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
