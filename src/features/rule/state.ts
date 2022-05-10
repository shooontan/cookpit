export type Rule = {
  id: string;
  url: string;
  regexp: boolean;
  body: string;
};

export type RuleState = {
  rules: Rule[];
};

export const initialRuleState: RuleState = {
  rules: [],
};
